/**
 * ==========================================================================
 * MAINAKER DOLBOL — ADMIN / MANAGER MEDIA PORTAL (FIREBASE + INDEXEDDB)
 * File: js/admin.js
 * ==========================================================================
 * Features:
 * 1. Exclusive Admin Authentication for Band Manager (Subha Chatterjee):
 *    - Firebase Authentication (Email/Password & Google Sign-In) when Firebase is configured
 *    - Instant Manager Passcode authentication (Default: admin@mainakerdolbol.com / MAINAK2026)
 * 2. Real-time Cloud Sync via Firebase (Firestore + Firebase Storage) + IndexedDB persistence:
 *    - Upload new Photos to Photo Gallery (#galleryGrid)
 *    - Upload new Videos (MP4/WebM or URL) to Concerts Glimpse (#videosGrid)
 *    - Delete any existing or newly uploaded Photo or Video (restricted strictly to Admin)
 *    - Restore deleted original items anytime
 * ==========================================================================
 */

// ============================================================================
// 1. DEFAULT FIREBASE CONFIGURATION (Replace or configure via Admin UI Tab 4)
// ============================================================================
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCY1CPKrhpZRhsiIGAdxAv7KuUDM_ZSURE",
  authDomain: "mainaker-dolbol-website.firebaseapp.com",
  projectId: "mainaker-dolbol-website",
  storageBucket: "mainaker-dolbol-website.firebasestorage.app",
  messagingSenderId: "436991654484",
  appId: "1:436991654484:web:7ea421ea98088b21e60bc1",
  measurementId: "G-6N2NR3RKXN"
};

const STORAGE_KEYS = {
  FIREBASE_CONFIG: "md_firebase_config_v1",
  ADMIN_SESSION: "md_admin_session_v1",
  ADMIN_EMAIL: "md_admin_allowed_email_v1",
  ADMIN_PASSCODE: "md_admin_passcode_v1",
  DELETED_PHOTOS: "md_deleted_photos_v1",
  DELETED_VIDEOS: "md_deleted_videos_v1"
};

const IDB_NAME = "MainakerDolbolMediaDB";
const IDB_VERSION = 1;
const STORE_PHOTOS = "custom_photos";
const STORE_VIDEOS = "custom_videos";

// Runtime State
let isAdminAuthenticated = false;
let currentAdminEmail = "";
let firebaseReady = false;
let fbApp = null;
let fbAuth = null;
let fbDb = null;
let fbStorage = null;
let fbModules = null;

let customPhotosList = [];
let customVideosList = [];
let deletedPhotoIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.DELETED_PHOTOS) || "[]").map(String));
let deletedVideoIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.DELETED_VIDEOS) || "[]").map(String));

function getAllowedAdminEmail() {
  return (localStorage.getItem(STORAGE_KEYS.ADMIN_EMAIL) || "admin@mainakerdolbol.com").trim().toLowerCase();
}

function getAdminPasscode() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSCODE) || "MAINAK2026";
}

function getActiveFirebaseConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.apiKey && parsed.projectId) return parsed;
    }
  } catch (e) {
    console.warn("Invalid saved Firebase config:", e);
  }
  if (DEFAULT_FIREBASE_CONFIG.apiKey && DEFAULT_FIREBASE_CONFIG.projectId) {
    return DEFAULT_FIREBASE_CONFIG;
  }
  return null;
}

// ============================================================================
// 2. INDEXEDDB ENGINE (Handles large image & MP4 video blobs locally)
// ============================================================================
function openMediaDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
        db.createObjectStore(STORE_PHOTOS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_VIDEOS)) {
        db.createObjectStore(STORE_VIDEOS, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGetAll(storeName) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB read warning:", err);
    return [];
  }
}

async function idbPut(storeName, item) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.put(item);
    req.onsuccess = () => resolve(item);
    req.onerror = () => reject(req.error);
  });
}

async function idbDelete(storeName, id) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ============================================================================
// 3. FIREBASE DYNAMIC INITIALIZATION (Auth + Firestore + Storage)
// ============================================================================
async function initFirebaseIfConfigured() {
  const config = getActiveFirebaseConfig();
  const statusText = document.getElementById("adminBackendStatusText");
  const modeBadge = document.getElementById("adminStorageModeBadge");

  if (!config) {
    firebaseReady = false;
    if (statusText) {
      statusText.textContent = "Storage Engine: Local IndexedDB Active (Configure Firebase keys for global cloud sync)";
    }
    if (modeBadge) {
      modeBadge.textContent = "LOCAL + IDB";
    }
    return false;
  }

  try {
    if (statusText) statusText.textContent = "Connecting to Firebase Cloud...";
    const [appMod, authMod, firestoreMod, storageMod] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"),
      import("https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js")
    ]);

    fbModules = { ...appMod, ...authMod, ...firestoreMod, ...storageMod };
    fbApp = fbModules.getApps().length ? fbModules.getApp() : fbModules.initializeApp(config);
    fbAuth = fbModules.getAuth(fbApp);
    fbDb = fbModules.getFirestore(fbApp);
    fbStorage = fbModules.getStorage(fbApp);
    firebaseReady = true;

    if (statusText) {
      statusText.textContent = `Firebase Cloud Connected (${config.projectId})`;
    }
    if (modeBadge) {
      modeBadge.textContent = "FIREBASE CLOUD";
    }

    // Listen to Firebase Auth state
    fbModules.onAuthStateChanged(fbAuth, (user) => {
      if (user && user.email) {
        const allowed = getAllowedAdminEmail();
        if (!allowed || user.email.toLowerCase() === allowed || user.email.toLowerCase() === "subha@mainakerdolbol.com") {
          setAdminAuthenticated(true, user.email);
        }
      }
    });

    // Subscribe to real-time Firestore collections for Gallery, Videos & Deletions
    subscribeToFirestoreMedia();
    return true;
  } catch (err) {
    console.warn("Firebase initialization fallback to IndexedDB:", err);
    firebaseReady = false;
    if (statusText) {
      statusText.textContent = "Firebase connection failed — using Local IndexedDB storage.";
    }
    return false;
  }
}

function subscribeToFirestoreMedia() {
  if (!firebaseReady || !fbDb || !fbModules) return;

  const { collection, onSnapshot, doc } = fbModules;

  // Listen to deleted IDs doc
  onSnapshot(
    doc(fbDb, "md_settings", "deleted_media"),
    (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (Array.isArray(data.deletedPhotos)) {
          deletedPhotoIds = new Set(data.deletedPhotos.map(String));
          localStorage.setItem(STORAGE_KEYS.DELETED_PHOTOS, JSON.stringify([...deletedPhotoIds]));
        }
        if (Array.isArray(data.deletedVideos)) {
          deletedVideoIds = new Set(data.deletedVideos.map(String));
          localStorage.setItem(STORAGE_KEYS.DELETED_VIDEOS, JSON.stringify([...deletedVideoIds]));
        }
        syncAndRenderWebsiteMedia();
      }
    },
    (err) => console.warn("Firestore deleted_media listener warning:", err)
  );

  // Listen to uploaded photos collection
  onSnapshot(
    collection(fbDb, "md_gallery"),
    (snap) => {
      const cloudPhotos = [];
      snap.forEach((d) => cloudPhotos.push({ id: d.id, ...d.data() }));
      cloudPhotos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      customPhotosList = mergeById(cloudPhotos, customPhotosList);
      syncAndRenderWebsiteMedia();
    },
    (err) => console.warn("Firestore md_gallery listener warning:", err)
  );

  // Listen to uploaded videos collection
  onSnapshot(
    collection(fbDb, "md_videos"),
    (snap) => {
      const cloudVideos = [];
      snap.forEach((d) => cloudVideos.push({ id: d.id, ...d.data() }));
      cloudVideos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      customVideosList = mergeById(cloudVideos, customVideosList);
      syncAndRenderWebsiteMedia();
    },
    (err) => console.warn("Firestore md_videos listener warning:", err)
  );
}

function mergeById(primaryList, secondaryList) {
  const map = new Map();
  secondaryList.forEach((item) => map.set(String(item.id), item));
  primaryList.forEach((item) => map.set(String(item.id), item));
  return Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

// ============================================================================
// 4. SYNC & RENDER GALLERY AND VIDEOS ON WEBSITE
// ============================================================================
function syncAndRenderWebsiteMedia() {
  if (!window.galleryData || !window.videosData) return;

  // Rebuild gallery array: Custom uploaded photos first, then non-deleted default photos
  const baseGallery = (window.defaultGalleryData || []).filter(
    (item) => !deletedPhotoIds.has(String(item.id))
  );
  const activeCustomPhotos = customPhotosList.filter(
    (item) => !deletedPhotoIds.has(String(item.id))
  );

  window.galleryData.length = 0;
  window.galleryData.push(...activeCustomPhotos, ...baseGallery);

  // Rebuild videos array: Custom uploaded videos first, then non-deleted default videos
  const baseVideos = (window.defaultVideosData || []).filter(
    (item) => !deletedVideoIds.has(String(item.id))
  );
  const activeCustomVideos = customVideosList.filter(
    (item) => !deletedVideoIds.has(String(item.id))
  );

  window.videosData.length = 0;
  window.videosData.push(...activeCustomVideos, ...baseVideos);

  if (typeof window.renderPhotoGallery === "function") {
    window.renderPhotoGallery();
  }
  if (typeof window.renderVideosGrid === "function") {
    window.renderVideosGrid();
  }

  renderAdminManageLists();
}

// ============================================================================
// 5. ADMIN AUTHENTICATION STATE & UI CONTROLLER
// ============================================================================
function setAdminAuthenticated(authenticated, email = "admin@mainakerdolbol.com") {
  isAdminAuthenticated = Boolean(authenticated);
  currentAdminEmail = isAdminAuthenticated ? email : "";

  document.body.classList.toggle("is-admin-authenticated", isAdminAuthenticated);

  const loginView = document.getElementById("adminLoginView");
  const dashView = document.getElementById("adminDashboardView");
  const statusBar = document.getElementById("adminStatusBar");
  const footerBtnText = document.getElementById("footerAdminBtnText");
  const activeEmailEl = document.getElementById("adminActiveEmail");
  const barUserLabel = document.getElementById("adminBarUserLabel");

  if (loginView) loginView.hidden = isAdminAuthenticated;
  if (dashView) dashView.hidden = !isAdminAuthenticated;
  if (statusBar) statusBar.hidden = !isAdminAuthenticated;

  if (footerBtnText) {
    footerBtnText.textContent = isAdminAuthenticated ? "ADMIN DASHBOARD (ACTIVE)" : "MANAGER PORTAL";
  }
  if (activeEmailEl && email) {
    activeEmailEl.textContent = email;
  }
  if (barUserLabel) {
    barUserLabel.textContent = `ADMIN ACTIVE • ${email.toUpperCase()}`;
  }

  if (isAdminAuthenticated) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, email);
    renderAdminManageLists();
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }
}

function showAdminToast(message, isError = false) {
  const banner = document.getElementById("adminFeedbackBanner");
  if (!banner) return;
  banner.hidden = false;
  banner.textContent = message;
  banner.classList.toggle("is-error", isError);
  clearTimeout(banner._hideTimer);
  banner._hideTimer = setTimeout(() => {
    banner.hidden = true;
  }, 4500);
}

// ============================================================================
// 6. IMAGE COMPRESSION & FILE UPLOAD HELPERS
// ============================================================================
function readFileAsDataURL(file, onProgress) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable && typeof onProgress === "function") {
        onProgress(Math.round((e.loaded / e.total) * 90));
      }
    };
    reader.onload = () => {
      if (typeof onProgress === "function") onProgress(100);
      resolve(reader.result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function compressImageFile(file, maxWidth = 1600, quality = 0.84) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadMediaFileToBackend(file, folder, onProgress) {
  // If Firebase Storage is connected, try uploading to Firebase Storage first
  if (firebaseReady && fbStorage && fbModules) {
    try {
      const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const storagePath = `${folder}/${safeName}`;
      const storageRef = fbModules.ref(fbStorage, storagePath);
      const uploadTask = fbModules.uploadBytesResumable(storageRef, file);

      const downloadUrl = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            if (snapshot.totalBytes && typeof onProgress === "function") {
              const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              onProgress(pct);
            }
          },
          (err) => reject(err),
          async () => {
            const url = await fbModules.getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      return { url: downloadUrl, storagePath };
    } catch (storageErr) {
      console.warn("Firebase Storage upload fallback to compressed data URL:", storageErr);
    }
  }

  // Fallback: Compress image or read video as Data URL for IndexedDB / Firestore
  if (file.type.startsWith("image/")) {
    if (typeof onProgress === "function") onProgress(45);
    const dataUrl = await compressImageFile(file);
    if (typeof onProgress === "function") onProgress(100);
    return { url: dataUrl, storagePath: null };
  }

  const dataUrl = await readFileAsDataURL(file, onProgress);
  return { url: dataUrl, storagePath: null };
}

// ============================================================================
// 7. UPLOAD & DELETE OPERATIONS (ADMIN ONLY)
// ============================================================================
async function handlePhotoUpload(e) {
  e.preventDefault();
  if (!isAdminAuthenticated) {
    showAdminToast("Unauthorized: Only the authenticated Manager can upload photos.", true);
    return;
  }

  const titleInput = document.getElementById("photoTitleInput");
  const categoryInput = document.getElementById("photoCategoryInput");
  const spanInput = document.getElementById("photoSpanInput");
  const fileInput = document.getElementById("photoFileInput");
  const urlInput = document.getElementById("photoUrlInput");
  const progressWrap = document.getElementById("photoUploadProgressWrap");
  const progressFill = document.getElementById("photoUploadProgressFill");
  const progressText = document.getElementById("photoUploadProgressText");
  const submitBtn = document.getElementById("photoUploadSubmitBtn");

  const title = (titleInput?.value || "").trim();
  const category = categoryInput?.value || "LIVE";
  const span = spanInput?.value || "";
  const file = fileInput?.files?.[0];
  const directUrl = (urlInput?.value || "").trim();

  if (!title) {
    showAdminToast("Please enter a photo title / caption.", true);
    titleInput?.focus();
    return;
  }
  if (!file && !directUrl) {
    showAdminToast("Please select an image file or provide an image URL.", true);
    return;
  }

  try {
    if (submitBtn) submitBtn.disabled = true;
    if (progressWrap) progressWrap.hidden = false;

    let finalSrc = directUrl;
    let storagePath = null;

    if (file) {
      const uploaded = await uploadMediaFileToBackend(file, "gallery_photos", (pct) => {
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `Uploading photo... ${pct}%`;
      });
      finalSrc = uploaded.url;
      storagePath = uploaded.storagePath;
    }

    const newPhoto = {
      id: `photo_${Date.now()}`,
      src: finalSrc,
      title,
      category,
      span,
      storagePath,
      uploadedBy: currentAdminEmail,
      createdAt: Date.now()
    };

    // Save to local IndexedDB immediately
    await idbPut(STORE_PHOTOS, newPhoto);
    customPhotosList.unshift(newPhoto);

    // Save to Cloud Firestore if connected
    if (firebaseReady && fbDb && fbModules) {
      try {
        await fbModules.setDoc(fbModules.doc(fbDb, "md_gallery", newPhoto.id), newPhoto);
      } catch (dbErr) {
        console.warn("Firestore photo save warning (saved locally in IndexedDB):", dbErr);
      }
    }

    syncAndRenderWebsiteMedia();
    e.target.reset();
    showAdminToast(`Photo "${title}" published to Photo Gallery!`);
  } catch (err) {
    console.error("Photo upload error:", err);
    showAdminToast(`Upload failed: ${err.message || "Unknown error"}`, true);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    setTimeout(() => {
      if (progressWrap) progressWrap.hidden = true;
      if (progressFill) progressFill.style.width = "0%";
    }, 900);
  }
}

async function handleVideoUpload(e) {
  e.preventDefault();
  if (!isAdminAuthenticated) {
    showAdminToast("Unauthorized: Only the authenticated Manager can upload videos.", true);
    return;
  }

  const titleInput = document.getElementById("videoTitleInput");
  const categoryInput = document.getElementById("videoCategoryInput");
  const subtitleInput = document.getElementById("videoSubtitleInput");
  const fileInput = document.getElementById("videoFileInput");
  const urlInput = document.getElementById("videoUrlInput");
  const progressWrap = document.getElementById("videoUploadProgressWrap");
  const progressFill = document.getElementById("videoUploadProgressFill");
  const progressText = document.getElementById("videoUploadProgressText");
  const submitBtn = document.getElementById("videoUploadSubmitBtn");

  const title = (titleInput?.value || "").trim();
  const category = (categoryInput?.value || "LIVE CONCERT").trim().toUpperCase();
  const subtitle = (subtitleInput?.value || "MAINAKER DOLBOL • Live Concert Performance").trim();
  const file = fileInput?.files?.[0];
  const directUrl = (urlInput?.value || "").trim();

  if (!title) {
    showAdminToast("Please enter a video title.", true);
    titleInput?.focus();
    return;
  }
  if (!file && !directUrl) {
    showAdminToast("Please select a video file (MP4/WebM) or enter a video URL.", true);
    return;
  }

  try {
    if (submitBtn) submitBtn.disabled = true;
    if (progressWrap) progressWrap.hidden = false;

    let finalVideoSrc = directUrl;
    let storagePath = null;

    if (file) {
      const uploaded = await uploadMediaFileToBackend(file, "concert_videos", (pct) => {
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `Uploading video... ${pct}%`;
      });
      finalVideoSrc = uploaded.url;
      storagePath = uploaded.storagePath;
    }

    const newVideo = {
      id: `video_${Date.now()}`,
      title,
      subtitle,
      category,
      duration: "LIVE",
      videoSrc: finalVideoSrc,
      storagePath,
      uploadedBy: currentAdminEmail,
      createdAt: Date.now()
    };

    // Save to local IndexedDB
    await idbPut(STORE_VIDEOS, newVideo);
    customVideosList.unshift(newVideo);

    // Save to Cloud Firestore if connected (only if URL or under 900KB)
    if (firebaseReady && fbDb && fbModules && (!finalVideoSrc.startsWith("data:") || finalVideoSrc.length < 900000)) {
      try {
        await fbModules.setDoc(fbModules.doc(fbDb, "md_videos", newVideo.id), newVideo);
      } catch (dbErr) {
        console.warn("Firestore video metadata save warning:", dbErr);
      }
    }

    syncAndRenderWebsiteMedia();
    e.target.reset();
    showAdminToast(`Video "${title}" published to Concerts Glimpse!`);
  } catch (err) {
    console.error("Video upload error:", err);
    showAdminToast(`Video upload failed: ${err.message || "Unknown error"}`, true);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    setTimeout(() => {
      if (progressWrap) progressWrap.hidden = true;
      if (progressFill) progressFill.style.width = "0%";
    }, 900);
  }
}

async function deletePhotoById(photoId) {
  if (!isAdminAuthenticated) {
    alert("Restricted Action: Only the authenticated Band Manager can delete photos.");
    return;
  }

  const idStr = String(photoId);
  const target = (window.galleryData || []).find((p) => String(p.id) === idStr);
  const label = target ? target.title : `Photo #${idStr}`;

  if (!window.confirm(`Delete "${label}" from the Photo Gallery?`)) return;

  deletedPhotoIds.add(idStr);
  localStorage.setItem(STORAGE_KEYS.DELETED_PHOTOS, JSON.stringify([...deletedPhotoIds]));

  // Remove from customPhotosList & IndexedDB if it was custom-uploaded
  customPhotosList = customPhotosList.filter((p) => String(p.id) !== idStr);
  await idbDelete(STORE_PHOTOS, idStr).catch(() => {});

  // Sync deletion to Firebase if connected
  if (firebaseReady && fbDb && fbModules) {
    try {
      await fbModules.deleteDoc(fbModules.doc(fbDb, "md_gallery", idStr)).catch(() => {});
      await fbModules.setDoc(
        fbModules.doc(fbDb, "md_settings", "deleted_media"),
        { deletedPhotos: [...deletedPhotoIds], deletedVideos: [...deletedVideoIds] },
        { merge: true }
      );
      if (target?.storagePath && fbStorage) {
        await fbModules.deleteObject(fbModules.ref(fbStorage, target.storagePath)).catch(() => {});
      }
    } catch (e) {
      console.warn("Firebase photo delete sync warning:", e);
    }
  }

  syncAndRenderWebsiteMedia();
  showAdminToast(`Deleted "${label}" from Photo Gallery.`);
}

async function deleteVideoById(videoId) {
  if (!isAdminAuthenticated) {
    alert("Restricted Action: Only the authenticated Band Manager can delete videos.");
    return;
  }

  const idStr = String(videoId);
  const target = (window.videosData || []).find((v) => String(v.id) === idStr);
  const label = target ? target.title : `Video #${idStr}`;

  if (!window.confirm(`Delete "${label}" from Concerts Glimpse?`)) return;

  deletedVideoIds.add(idStr);
  localStorage.setItem(STORAGE_KEYS.DELETED_VIDEOS, JSON.stringify([...deletedVideoIds]));

  customVideosList = customVideosList.filter((v) => String(v.id) !== idStr);
  await idbDelete(STORE_VIDEOS, idStr).catch(() => {});

  if (firebaseReady && fbDb && fbModules) {
    try {
      await fbModules.deleteDoc(fbModules.doc(fbDb, "md_videos", idStr)).catch(() => {});
      await fbModules.setDoc(
        fbModules.doc(fbDb, "md_settings", "deleted_media"),
        { deletedPhotos: [...deletedPhotoIds], deletedVideos: [...deletedVideoIds] },
        { merge: true }
      );
      if (target?.storagePath && fbStorage) {
        await fbModules.deleteObject(fbModules.ref(fbStorage, target.storagePath)).catch(() => {});
      }
    } catch (e) {
      console.warn("Firebase video delete sync warning:", e);
    }
  }

  syncAndRenderWebsiteMedia();
  showAdminToast(`Deleted "${label}" from Concerts Glimpse.`);
}

async function restoreDeletedDefaultMedia() {
  if (!isAdminAuthenticated) return;
  deletedPhotoIds.clear();
  deletedVideoIds.clear();
  localStorage.removeItem(STORAGE_KEYS.DELETED_PHOTOS);
  localStorage.removeItem(STORAGE_KEYS.DELETED_VIDEOS);

  if (firebaseReady && fbDb && fbModules) {
    try {
      await fbModules.setDoc(
        fbModules.doc(fbDb, "md_settings", "deleted_media"),
        { deletedPhotos: [], deletedVideos: [] },
        { merge: true }
      );
    } catch (e) {
      console.warn("Firestore restore defaults warning:", e);
    }
  }

  syncAndRenderWebsiteMedia();
  showAdminToast("All original default photos and videos have been restored.");
}

// ============================================================================
// 8. RENDER ADMIN MANAGE / DELETE LISTS INSIDE MODAL
// ============================================================================
function renderAdminManageLists() {
  const videoListEl = document.getElementById("adminManageVideosList");
  const photoListEl = document.getElementById("adminManagePhotosList");
  const videoCountEl = document.getElementById("adminVideoCount");
  const photoCountEl = document.getElementById("adminPhotoCount");
  const totalCountEl = document.getElementById("adminTotalMediaCount");

  const activeVideos = window.videosData || [];
  const activePhotos = window.galleryData || [];

  if (videoCountEl) videoCountEl.textContent = String(activeVideos.length);
  if (photoCountEl) photoCountEl.textContent = String(activePhotos.length);
  if (totalCountEl) totalCountEl.textContent = String(activeVideos.length + activePhotos.length);

  if (videoListEl) {
    videoListEl.innerHTML = activeVideos
      .map(
        (v) => `
        <div class="admin-media-row">
          <div class="admin-media-thumb is-video">
            <video src="${v.videoSrc.includes("#t=") || v.videoSrc.startsWith("data:") ? v.videoSrc : v.videoSrc + "#t=0.5"}" muted preload="metadata"></video>
          </div>
          <div class="admin-media-info">
            <strong>${v.title}</strong>
            <span>${v.category} &bull; ${v.subtitle}</span>
          </div>
          <button type="button" class="admin-row-delete-btn" data-admin-delete-video="${v.id}">
            DELETE
          </button>
        </div>
      `
      )
      .join("");
  }

  if (photoListEl) {
    photoListEl.innerHTML = activePhotos
      .map(
        (p) => `
        <div class="admin-media-row">
          <div class="admin-media-thumb">
            <img src="${p.src}" alt="${p.title}" loading="lazy">
          </div>
          <div class="admin-media-info">
            <strong>${p.title}</strong>
            <span>${p.category} ${p.span ? `&bull; ${p.span}` : ""}</span>
          </div>
          <button type="button" class="admin-row-delete-btn" data-admin-delete-photo="${p.id}">
            DELETE
          </button>
        </div>
      `
      )
      .join("");
  }
}

// ============================================================================
// 9. MODAL NAVIGATION & EVENT LISTENERS
// ============================================================================
function switchAdminTab(tabName) {
  const tabBtns = document.querySelectorAll("[data-admin-tab]");
  tabBtns.forEach((btn) => {
    const isMatch = btn.dataset.adminTab === tabName;
    btn.classList.toggle("active", isMatch);
    btn.setAttribute("aria-selected", String(isMatch));
  });

  const panels = {
    photos: document.getElementById("adminTabPhotos"),
    videos: document.getElementById("adminTabVideos"),
    manage: document.getElementById("adminTabManage"),
    firebase: document.getElementById("adminTabFirebase")
  };

  Object.entries(panels).forEach(([key, panel]) => {
    if (panel) panel.hidden = key !== tabName;
  });

  if (tabName === "manage") {
    renderAdminManageLists();
  }
}

function openAdminModal(targetTab = "photos") {
  const modal = document.getElementById("adminModal");
  if (!modal) return;
  if (isAdminAuthenticated && targetTab) {
    switchAdminTab(targetTab);
  }
  if (typeof modal.showModal === "function" && !modal.open) {
    modal.showModal();
  }
}

async function initAdminPortal() {
  // Load custom uploaded media from IndexedDB first
  const [savedPhotos, savedVideos] = await Promise.all([
    idbGetAll(STORE_PHOTOS),
    idbGetAll(STORE_VIDEOS)
  ]);

  customPhotosList = savedPhotos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  customVideosList = savedVideos.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // Restore session if manager is already authenticated in this tab
  const savedSessionEmail = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  if (savedSessionEmail) {
    setAdminAuthenticated(true, savedSessionEmail);
  }

  // Sync media into #galleryGrid and #videosGrid
  syncAndRenderWebsiteMedia();

  // Initialize Firebase Cloud if configured
  await initFirebaseIfConfigured();

  // Pre-fill Firebase Config form inputs
  const cfgInput = document.getElementById("firebaseConfigJsonInput");
  const emailInput = document.getElementById("adminAllowedEmailInput");
  const passcodeInput = document.getElementById("adminNewPasscodeInput");
  const activeCfg = getActiveFirebaseConfig();
  if (cfgInput && activeCfg) {
    cfgInput.value = JSON.stringify(activeCfg, null, 2);
  }
  if (emailInput) emailInput.value = getAllowedAdminEmail();
  if (passcodeInput) passcodeInput.value = getAdminPasscode();

  // Login Form Submission (Supports both Firebase Auth and Manager Passcode)
  const loginForm = document.getElementById("adminLoginForm");
  const loginError = document.getElementById("adminLoginError");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (loginError) loginError.hidden = true;

      const email = (document.getElementById("adminEmail")?.value || "").trim().toLowerCase();
      const password = (document.getElementById("adminPassword")?.value || "").trim();
      const allowedEmail = getAllowedAdminEmail();
      const validPasscode = getAdminPasscode();

      // 1. Check Manager Passcode authentication
      const isAllowedManagerEmail =
        email === allowedEmail ||
        email === "admin@mainakerdolbol.com" ||
        email === "subha@mainakerdolbol.com";

      if (isAllowedManagerEmail && password === validPasscode) {
        if (firebaseReady && fbAuth && fbModules) {
          try {
            await fbModules.signInWithEmailAndPassword(fbAuth, email, password);
          } catch (_) {
            try {
              await fbModules.createUserWithEmailAndPassword(fbAuth, email, password);
            } catch (__) {
              await fbModules.signInAnonymously?.(fbAuth).catch(() => {});
            }
          }
        }
        setAdminAuthenticated(true, email);
        showAdminToast("Welcome, Subha Chatterjee! Admin Media Portal unlocked (Firebase Connected).");
        return;
      }

      // 2. If Firebase Cloud is active, authenticate with Firebase Email/Password
      if (firebaseReady && fbAuth && fbModules) {
        try {
          const cred = await fbModules.signInWithEmailAndPassword(fbAuth, email, password);
          setAdminAuthenticated(true, cred.user.email);
          showAdminToast(`Authenticated via Firebase as ${cred.user.email}`);
          return;
        } catch (fbErr) {
          // If admin account doesn't exist yet on Firebase and matches allowed email, create it
          if (
            isAllowedManagerEmail &&
            (fbErr.code === "auth/user-not-found" || fbErr.code === "auth/invalid-credential") &&
            password.length >= 6
          ) {
            try {
              const created = await fbModules.createUserWithEmailAndPassword(fbAuth, email, password);
              setAdminAuthenticated(true, created.user.email);
              showAdminToast(`Created Firebase Admin account for ${created.user.email}`);
              return;
            } catch (_) {
              // Fall through to error message
            }
          }
          if (loginError) {
            loginError.hidden = false;
            loginError.textContent = `Access Denied: Invalid Manager credentials (${fbErr.code || "Unauthorized"}). Default passcode: ${validPasscode}`;
          }
          return;
        }
      }

      if (loginError) {
        loginError.hidden = false;
        loginError.textContent =
          "Access Denied: Only the authorized Band Manager can sign in. (Use admin@mainakerdolbol.com & passcode MAINAK2026)";
      }
    });
  }

  // Google Sign-In Button (Firebase Auth)
  const googleBtn = document.getElementById("adminGoogleLoginBtn");
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      if (!firebaseReady || !fbAuth || !fbModules) {
        if (loginError) {
          loginError.hidden = false;
          loginError.textContent =
            "Firebase Cloud keys are not configured yet. Sign in with Manager Passcode (MAINAK2026) to configure Firebase keys.";
        }
        return;
      }
      try {
        const provider = new fbModules.GoogleAuthProvider();
        const result = await fbModules.signInWithPopup(fbAuth, provider);
        const userEmail = (result.user?.email || "").toLowerCase();
        const allowed = getAllowedAdminEmail();
        if (allowed && userEmail !== allowed && allowed !== "admin@mainakerdolbol.com") {
          await fbModules.signOut(fbAuth);
          if (loginError) {
            loginError.hidden = false;
            loginError.textContent = `Access Denied: ${userEmail} is not the authorized Admin email (${allowed}).`;
          }
          return;
        }
        setAdminAuthenticated(true, userEmail);
        showAdminToast(`Signed in with Google as ${userEmail}`);
      } catch (err) {
        if (loginError) {
          loginError.hidden = false;
          loginError.textContent = `Google Sign-In error: ${err.message}`;
        }
      }
    });
  }

  // Quick link from Login screen to Firebase Config tab (requires passcode prompt or unlocks after login)
  const quickFbBtn = document.getElementById("openFirebaseSetupFromLoginBtn");
  if (quickFbBtn) {
    quickFbBtn.addEventListener("click", () => {
      const pwInput = document.getElementById("adminPassword");
      if (pwInput) {
        pwInput.focus();
      }
      if (loginError) {
        loginError.hidden = false;
        loginError.textContent =
          "Enter Manager Passcode (Default: MAINAK2026) above first to access Firebase Cloud Configuration.";
      }
    });
  }

  // Logout Buttons
  const logoutHandler = async () => {
    if (firebaseReady && fbAuth && fbModules) {
      await fbModules.signOut(fbAuth).catch(() => {});
    }
    setAdminAuthenticated(false);
    const modal = document.getElementById("adminModal");
    if (modal && modal.open) modal.close();
  };

  document.getElementById("adminLogoutBtn")?.addEventListener("click", logoutHandler);
  document.getElementById("adminBarLogoutBtn")?.addEventListener("click", logoutHandler);

  // Tab Switching inside Admin Modal
  document.querySelectorAll("[data-admin-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchAdminTab(btn.dataset.adminTab));
  });

  // Upload Forms
  document.getElementById("adminPhotoUploadForm")?.addEventListener("submit", handlePhotoUpload);
  document.getElementById("adminVideoUploadForm")?.addEventListener("submit", handleVideoUpload);

  // Restore Defaults Button
  document.getElementById("adminRestoreDefaultsBtn")?.addEventListener("click", restoreDeletedDefaultMedia);

  // Save Firebase Config Form
  document.getElementById("adminFirebaseConfigForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!isAdminAuthenticated) return;

    const rawJson = (document.getElementById("firebaseConfigJsonInput")?.value || "").trim();
    const allowedEmail = (document.getElementById("adminAllowedEmailInput")?.value || "").trim().toLowerCase();
    const newPasscode = (document.getElementById("adminNewPasscodeInput")?.value || "").trim();

    if (allowedEmail) localStorage.setItem(STORAGE_KEYS.ADMIN_EMAIL, allowedEmail);
    if (newPasscode) localStorage.setItem(STORAGE_KEYS.ADMIN_PASSCODE, newPasscode);

    if (rawJson) {
      try {
        // Support pasting either strict JSON or JS object snippet
        const normalized = rawJson
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":')
          .replace(/'/g, '"');
        const parsed = JSON.parse(normalized);
        if (!parsed.apiKey || !parsed.projectId) {
          throw new Error("Config must include apiKey and projectId.");
        }
        localStorage.setItem(STORAGE_KEYS.FIREBASE_CONFIG, JSON.stringify(parsed));
        await initFirebaseIfConfigured();
        showAdminToast(`Connected to Firebase project "${parsed.projectId}"!`);
      } catch (err) {
        showAdminToast(`Invalid Firebase JSON: ${err.message}`, true);
        return;
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.FIREBASE_CONFIG);
      await initFirebaseIfConfigured();
      showAdminToast("Saved Manager settings (Local IndexedDB mode).");
    }
  });

  // Global Delegated Click Listeners for Admin Triggers & Delete Buttons
  document.addEventListener("click", (e) => {
    const openModalBtn = e.target.closest("[data-open-admin-modal]");
    if (openModalBtn) {
      e.preventDefault();
      openAdminModal("photos");
      return;
    }

    const openTabBtn = e.target.closest("[data-open-admin-tab]");
    if (openTabBtn) {
      e.preventDefault();
      openAdminModal(openTabBtn.dataset.openAdminTab || "photos");
      return;
    }

    const delPhotoBtn = e.target.closest("[data-admin-delete-photo]");
    if (delPhotoBtn) {
      e.preventDefault();
      e.stopPropagation();
      deletePhotoById(delPhotoBtn.dataset.adminDeletePhoto);
      return;
    }

    const delVideoBtn = e.target.closest("[data-admin-delete-video]");
    if (delVideoBtn) {
      e.preventDefault();
      e.stopPropagation();
      deleteVideoById(delVideoBtn.dataset.adminDeleteVideo);
      return;
    }
  });

  // Keyboard shortcut: Ctrl + Shift + A opens Manager Portal
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
      e.preventDefault();
      openAdminModal("photos");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdminPortal);
} else {
  initAdminPortal();
}
