/**
 * ==========================================================================
 * MAINAKER DOLBOL — CONCERTS GLIMPSE (LOCAL VIDEOS) & MASONRY PHOTO GALLERY
 * File: js/gallery.js
 * ==========================================================================
 */

const videos = [
  {
    id: 1,
    title: "CONCERT GLIMPSE 01",
    subtitle: "MAINAKER DOLBOL • Live Concert Performance",
    category: "LIVE CONCERT",
    duration: "LIVE",
    videoSrc: "assets/videos/1.mp4"
  },
  {
    id: 2,
    title: "CONCERT GLIMPSE 02",
    subtitle: "MAINAKER DOLBOL • Crowd Energy & Stage Moment",
    category: "STAGE MOMENT",
    duration: "LIVE",
    videoSrc: "assets/videos/2.mp4"
  },
  {
    id: 3,
    title: "CONCERT GLIMPSE 03",
    subtitle: "MAINAKER DOLBOL • Folk & Rock Fusion Set",
    category: "LIVE SESSION",
    duration: "LIVE",
    videoSrc: "assets/videos/3.mp4"
  },
  {
    id: 4,
    title: "CONCERT GLIMPSE 04",
    subtitle: "MAINAKER DOLBOL • Rhythm & Percussion Showcase",
    category: "LIVE GROOVE",
    duration: "LIVE",
    videoSrc: "assets/videos/4.mp4"
  },
  {
    id: 5,
    title: "CONCERT GLIMPSE 05",
    subtitle: "MAINAKER DOLBOL • Instrumental & Vocal Highlight",
    category: "SPOTLIGHT",
    duration: "LIVE",
    videoSrc: "assets/videos/5.mp4"
  },
  {
    id: 6,
    title: "CONCERT GLIMPSE 06",
    subtitle: "MAINAKER DOLBOL • Festival Finale & Encore",
    category: "ENCORE LIVE",
    duration: "LIVE",
    videoSrc: "assets/videos/6.mp4"
  }
];

const gallery = [
  // PHOTO GALLERY IMAGES FROM assets/artists/
  { id: 1, src: "assets/artists/artist-vocalist.jpeg", title: "Mainak Paladhi — Live Folk Fusion Lead", category: "LIVE", span: "span-featured" },
  { id: 2, src: "assets/artists/artist-guiterist.jpeg", title: "Sanjay Seal — Lead Guitar Groove", category: "PORTRAITS", span: "" },
  { id: 3, src: "assets/artists/artist-vocalist-3.jpeg", title: "Mainak Paladhi — Ektara & Baul Soul", category: "PORTRAITS", span: "span-tall" },
  { id: 4, src: "assets/artists/artist-tabla.jpeg", title: "Arijit Talukder — Live Percussion & Tabla", category: "PORTRAITS", span: "" },
  { id: 5, src: "assets/artists/artist-vocalist-4-with-celeb.jpeg", title: "Mainak Paladhi — Backstage Honours", category: "BACKSTAGE", span: "span-wide" },
  { id: 6, src: "assets/artists/artist-octopad-2.jpeg", title: "Supratim Bhattacharya — Riverside Electronic Drums Portrait", category: "PORTRAITS", span: "span-tall" },
  { id: 7, src: "assets/artists/artist-keyboardist.jpeg", title: "Udayan Chakraborty — Roland XPS-10 Synth", category: "STUDIO", span: "" },
  { id: 8, src: "assets/artists/artist-octopad-1.jpeg", title: "Supratim Bhattacharya — Open-Air Percussion Session", category: "TRAVEL", span: "span-wide" },
  { id: 9, src: "assets/artists/artist-vocalist-4.jpeg", title: "Mainak Paladhi — Center Stage Command", category: "LIVE", span: "span-tall" },
  { id: 10, src: "assets/artists/manager.jpeg", title: "Subha Chatterjee — Full Band Manager", category: "PORTRAITS", span: "" },
  { id: 11, src: "assets/artists/manager-with celeb.jpeg", title: "Subha Chatterjee — Backstage With Special Guest", category: "BACKSTAGE", span: "span-wide" },
  { id: 12, src: "assets/artists/artist-octopad.jpeg", title: "Supratim Bhattacharya — Roland Octopad Live", category: "PORTRAITS", span: "" },
  { id: 13, src: "assets/artists/artist-vocalist-8.jpeg", title: "MAINAKER DOLBOL — Concert Stage Ensemble", category: "LIVE", span: "span-tall" },
  { id: 14, src: "assets/artists/artist-vocalist-2.jpeg", title: "Mainak Paladhi — Dubki & Stage Anthem", category: "LIVE", span: "span-wide" },
  { id: 15, src: "assets/artists/artist-guiterist-1.jpeg", title: "Sanjay Seal — Electric Solo Under Spotlights", category: "LIVE", span: "" },
  { id: 16, src: "assets/artists/artist-vocalist-6.jpeg", title: "11th Durgapur International Film Festival (DIFF)", category: "TRAVEL", span: "span-wide" },
  { id: 17, src: "assets/artists/artist-tabla-1.jpeg", title: "Arijit Talukder — Classical Rhythm Session", category: "STUDIO", span: "" },
  { id: 18, src: "assets/artists/artist-keyboardist-1.jpeg", title: "Udayan Chakraborty — Keys & Backing Harmonies", category: "STUDIO", span: "" },
  { id: 19, src: "assets/artists/artist-vocalist-5.jpeg", title: "Mainak Paladhi — High-Note Crescendo", category: "LIVE", span: "" },
  { id: 20, src: "assets/artists/artist-vocalist-5-with-celeb.jpeg", title: "Cultural Felicitation & Backstage Meet", category: "BACKSTAGE", span: "" },
  { id: 21, src: "assets/artists/artist-vocalist-9.jpeg", title: "Mainak Paladhi — Monochrome Stage Portrait", category: "PORTRAITS", span: "span-tall" },
  { id: 22, src: "assets/artists/artist-vocalist-7.jpeg", title: "Mainak Paladhi — Arena Spotlight Moment", category: "LIVE", span: "span-wide" },
  { id: 23, src: "assets/artists/artist-vocalist-10.jpeg", title: "MAINAKER DOLBOL — Festival Tour Finale", category: "TRAVEL", span: "" },
  { id: 24, src: "assets/artists/flute-1.jpeg", title: "Lagan Dasgupta — Classical & Folk Flute Virtuoso", category: "PORTRAITS", span: "span-tall" }
];

window.defaultVideosData = videos.map((v) => ({ ...v }));
window.defaultGalleryData = gallery.map((g) => ({ ...g }));
window.videosData = videos;
window.galleryData = gallery;
let currentGalleryFilter = "ALL";

function formatVideoTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "LIVE";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Render Concerts Glimpse Grid (#videosGrid) using local or cloud MP4 files
 */
function renderVideosGrid() {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;

  grid.innerHTML = videos
    .map(
      (video, idx) => `
      <article
        class="video-card reveal-up is-visible"
        style="--delay: ${(idx % 3) * 0.1}s;"
        data-cursor="play"
        data-video-url="${video.videoSrc}"
        data-video-title="${video.title} — ${video.subtitle}"
        tabindex="0"
        role="button"
        aria-label="Play concert video: ${video.title}"
      >
        <div class="video-thumb-wrap">
          <video
            src="${video.videoSrc.includes("#t=") || video.videoSrc.startsWith("data:") ? video.videoSrc : video.videoSrc + "#t=0.5"}"
            class="video-thumb-img"
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
          <div class="video-thumb-overlay">
            <span class="video-category-tag">${video.category}</span>
            <button
              type="button"
              class="admin-card-delete-btn"
              data-admin-delete-video="${video.id}"
              title="Delete Video (Admin Only)"
              aria-label="Delete video ${video.title}"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
              <span>DELETE</span>
            </button>
            <div class="video-card-play">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
            </div>
            <span class="video-duration-tag" data-duration-badge>${video.duration || "LIVE"}</span>
          </div>
        </div>

        <div class="video-card-body">
          <h3 class="video-card-title">${video.title}</h3>
          <p class="video-card-sub">${video.subtitle}</p>
        </div>
      </article>
    `
    )
    .join("");

  // Populate real video durations & silent hover preview on each card
  grid.querySelectorAll(".video-card").forEach((card) => {
    const previewVideo = card.querySelector("video.video-thumb-img");
    const durationBadge = card.querySelector("[data-duration-badge]");
    if (!previewVideo) return;

    previewVideo.addEventListener("loadedmetadata", () => {
      if (durationBadge && previewVideo.duration) {
        durationBadge.textContent = formatVideoTime(previewVideo.duration);
      }
    });

    card.addEventListener("mouseenter", () => {
      previewVideo.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      previewVideo.pause();
    });
  });
}

window.renderVideosGrid = renderVideosGrid;

/**
 * Local Video Modal Controller (#videoModal)
 */
function initVideoModal() {
  const videoModal = document.getElementById("videoModal");
  const localVideo = document.getElementById("localVideoPlayer");
  const titleEl = document.getElementById("videoModalTitle");
  if (!videoModal || !localVideo) return;

  function openVideoModal(url, title = "LIVE CONCERT GLIMPSE") {
    if (!url) return;
    if (titleEl) titleEl.textContent = title;
    localVideo.hidden = false;
    localVideo.src = url;
    localVideo.currentTime = 0;
    if (typeof videoModal.showModal === "function") {
      videoModal.showModal();
    }
    localVideo.play().catch(() => {});
  }

  // Stop playback whenever the dialog closes
  videoModal.addEventListener("close", () => {
    localVideo.pause();
    localVideo.removeAttribute("src");
    localVideo.load();
  });

  window.openVideoModal = openVideoModal;

  // Delegate clicks on any element with [data-video-url]
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-admin-delete-video]")) return;
    const trigger = e.target.closest("[data-video-url]");
    if (!trigger) return;
    e.preventDefault();
    openVideoModal(
      trigger.dataset.videoUrl,
      trigger.dataset.videoTitle || "MAINAKER DOLBOL — LIVE CONCERT GLIMPSE"
    );
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target.closest("[data-admin-delete-video]")) return;
    const trigger = e.target.closest("[data-video-url]");
    if (!trigger || trigger.tagName === "BUTTON") return;
    e.preventDefault();
    openVideoModal(
      trigger.dataset.videoUrl,
      trigger.dataset.videoTitle || "MAINAKER DOLBOL — LIVE CONCERT GLIMPSE"
    );
  });
}

/**
 * Initialize Masonry Photo Gallery & Fullscreen Lightbox (#galleryGrid & #lightboxModal)
 */
function initPhotoGallery() {
  const grid = document.getElementById("galleryGrid");
  const filterTabs = document.getElementById("galleryFilterTabs");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!grid) return;

  let filteredItems = [...gallery];
  let activeLightboxList = [...gallery];
  let currentIndex = 0;

  function renderGallery(category = currentGalleryFilter || "ALL") {
    currentGalleryFilter = category;
    filteredItems =
      category === "ALL"
        ? [...gallery]
        : gallery.filter((item) => item.category === category);

    grid.innerHTML = filteredItems
      .map(
        (item, idx) => `
        <figure
          class="gallery-item ${item.span || ""} is-visible"
          data-gallery-index="${idx}"
          data-cursor="view"
          tabindex="0"
          role="button"
          aria-label="Open photo in lightbox: ${item.title}"
        >
          <img
            src="${item.src}"
            alt="${item.title}"
            loading="lazy"
            width="700"
            height="520"
          >
          <button
            type="button"
            class="admin-card-delete-btn"
            data-admin-delete-photo="${item.id}"
            title="Delete Photo (Admin Only)"
            aria-label="Delete photo ${item.title}"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
            <span>DELETE</span>
          </button>
          <figcaption class="gallery-item-overlay">
            <span class="gallery-item-cat">${item.category}</span>
            <h3 class="gallery-item-title">${item.title}</h3>
          </figcaption>
        </figure>
      `
      )
      .join("");

    grid.querySelectorAll(".gallery-item").forEach((el) => {
      const idx = Number(el.dataset.galleryIndex);
      el.addEventListener("click", (e) => {
        if (e.target.closest("[data-admin-delete-photo]")) return;
        openLightbox(idx, filteredItems);
      });
      el.addEventListener("keydown", (e) => {
        if (e.target.closest("[data-admin-delete-photo]")) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(idx, filteredItems);
        }
      });
    });
  }

  window.renderPhotoGallery = renderGallery;

  function updateLightboxView() {
    if (!activeLightboxList.length) return;
    const item = activeLightboxList[currentIndex];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
    }
    if (lightboxCaption) lightboxCaption.textContent = item.title;
    if (lightboxCategory) lightboxCategory.textContent = item.category;
    if (lightboxCounter) {
      const cur = String(currentIndex + 1).padStart(2, "0");
      const tot = String(activeLightboxList.length).padStart(2, "0");
      lightboxCounter.textContent = `${cur} / ${tot}`;
    }
  }

  function openLightbox(index, sourceCollection = null) {
    if (sourceCollection) {
      activeLightboxList = sourceCollection;
    }
    if (!activeLightboxList.length) return;
    currentIndex = (index + activeLightboxList.length) % activeLightboxList.length;
    updateLightboxView();
    if (lightboxModal && typeof lightboxModal.showModal === "function") {
      lightboxModal.showModal();
    }
  }

  function stepLightbox(delta) {
    if (!activeLightboxList.length) return;
    currentIndex = (currentIndex + delta + activeLightboxList.length) % activeLightboxList.length;
    updateLightboxView();
  }

  if (prevBtn) prevBtn.addEventListener("click", () => stepLightbox(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => stepLightbox(1));

  // Keyboard navigation inside open Lightbox (LEFT / RIGHT)
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal || !lightboxModal.open) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepLightbox(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      stepLightbox(1);
    }
  });

  // Category Filter Tabs for Photo Gallery
  if (filterTabs) {
    filterTabs.querySelectorAll("[data-gallery-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterTabs.querySelectorAll(".filter-tab").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        renderGallery(btn.dataset.galleryFilter);
      });
    });
  }

  // Expose lightbox opener globally so #achievements and standalone portraits can use it
  window.openCollectionLightbox = openLightbox;

  // Support standalone lightbox triggers (e.g. Mainak Paladhi portraits)
  document.addEventListener("click", (e) => {
    const customTrigger = e.target.closest("[data-lightbox-src]");
    if (!customTrigger) return;
    e.preventDefault();
    activeLightboxList = [
      {
        src: customTrigger.dataset.lightboxSrc,
        title: customTrigger.dataset.lightboxTitle || "Mainak Paladhi — Archive Photograph",
        category: customTrigger.dataset.lightboxCat || "ARCHIVE"
      }
    ];
    currentIndex = 0;
    updateLightboxView();
    if (lightboxModal && typeof lightboxModal.showModal === "function") {
      lightboxModal.showModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const customTrigger = e.target.closest("[data-lightbox-src]");
    if (!customTrigger) return;
    e.preventDefault();
    customTrigger.click();
  });

  renderGallery("ALL");
}

/**
 * ==========================================================================
 * ACHIEVEMENTS, AWARDS & PRESS ARCHIVE (assets/achievements/*)
 * ==========================================================================
 */
const achievementsData = [
  {
    id: "ach-1",
    type: "image",
    category: "AWARDS",
    src: "assets/achievements/award-5.jpeg",
    badge: "BEST SINGER & BEST MUSIC VIDEO",
    meta: "NETAJI SUBHASH CHANDRA BOSE INT'L FILM FESTIVAL • #1 RANKED",
    title: "Best Singer & Best Music Video Trophy — ‘Ami Gour Bole Daki’",
    desc: "Mainak Paladhi honored with the Best Singer Award and #1 Official Music Video Nomination for ‘Ami Gour Bole Daki’ (আমি গৌর বলে ডাকি), alongside the Best Music Video trophy directed by Pramith Ganguly & Olivia Banerjee.",
    tags: ["Best Singer Award", "Ami Gour Bole Daki", "Film Festival Winner", "Dual Trophies"]
  },
  {
    id: "ach-2",
    type: "image",
    category: "AWARDS",
    src: "assets/achievements/award.PNG",
    badge: "11TH DIFF 2026 • WINNER TROPHY",
    meta: "DURGAPUR INTERNATIONAL FILM FESTIVAL • MUSIC VIDEO WINNER",
    title: "11th Durgapur International Film Festival — Winner Trophy",
    desc: "Prestigious golden crystal trophy awarded for Music Video Winner ‘Ami Gour Bole Daki’ at the 11th Durgapur International Film Festival (DIFF), presented in memory of Veena Chainpuri.",
    tags: ["11th DIFF Winner", "Golden Trophy", "Ami Gour Bole Daki", "International Honor"]
  },
  {
    id: "ach-3",
    type: "image",
    category: "AWARDS",
    src: "assets/achievements/award-3.jpeg",
    badge: "NANDAN KOLKATA • CERTIFICATE",
    meta: "11TH DURGAPUR INTERNATIONAL FILM FESTIVAL • OFFICIAL HONORS",
    title: "Certificate of Achievement — Music Video Winner at Nandan, Kolkata",
    desc: "Official Certificate of Achievement conferred at Nandan, Kolkata recognizing ‘Ami Gour Bole Daki’ as Music Video Winner at the 11th Durgapur International Film Festival.",
    tags: ["Nandan Kolkata", "Official Certificate", "Music Video Winner", "DIFF Honors"]
  },
  {
    id: "ach-4",
    type: "image",
    category: "AWARDS",
    src: "assets/achievements/award-4.jpeg",
    badge: "STAGE FELICITATION • COLLAGE",
    meta: "NETAJI SUBHASH CHANDRA BOSE INTERNATIONAL FILM FESTIVAL",
    title: "On-Stage Trophy Presentation & Festival Felicitation",
    desc: "Memorable stage moments as Mainak Paladhi receives the official festival trophy plaque and honors from esteemed jury members and dignitaries.",
    tags: ["Stage Felicitation", "Trophy Presentation", "Film Festival", "Mainak Paladhi"]
  },
  {
    id: "ach-5",
    type: "image",
    category: "ALBUMS",
    src: "assets/achievements/1.jpeg",
    badge: "KOLKATA PRESS CLUB • SAGARIKA MUSIC",
    meta: "OFFICIAL ALBUM LAUNCH • ভিতর বাহিরে (BHITOR BAHIRE)",
    title: "Grand Unveiling of Folk Album ‘Bhitor Bahire’ with Srikanta Acharya",
    desc: "Inaugurated at Kolkata Press Club under the banner of Sagarika Music alongside legendary Bengali vocalist Srikanta Acharya, renowned Rabindra Sangeet artist Indrani Bhowmick, and Riddhi.",
    tags: ["Srikanta Acharya", "Indrani Bhowmick", "Sagarika Music", "Kolkata Press Club"]
  },
  {
    id: "ach-6",
    type: "image",
    category: "ALBUMS",
    src: "assets/achievements/3.jpeg",
    badge: "10-TRACK FOLK ANTHOLOGY • CD COVER",
    meta: "SAGARIKA MUSIC • ARR. SUBHENDU SEKHAR DAS (MAKHAN DA)",
    title: "Official Album Artwork & Tracklist — ‘Bhitor Bahire’ (ভিতর বাহিরে)",
    desc: "Featuring 10 timeless folk compositions spanning Baul, Jhumur, Sufi, Bhatiyali, Qawwali, Chatka, Kirtan, Marfati, Sari, and Bangladeshi Lokogiti — arranged by Subhendu Sekhar Das (Makhan Da).",
    tags: ["10 Folk Tracks", "Baul & Jhumur", "Sagarika Music", "Makhan Da"]
  },
  {
    id: "ach-7",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/2.jpeg",
    badge: "FEATURED PRINT MEDIA • 4TH ALBUM",
    meta: "PRESS COVERAGE • KOLKATA PRESS CLUB INAUGURATION",
    title: "“আত্মপ্রকাশ হল মৈনাকের লোকগানের অ্যালবাম ‘ভিতর বাহিরে’”",
    desc: "Celebrated in print media as Mainak Paladhi’s fourth studio release and landmark first Lokogiti album, highlighting the earthy aroma (“মাটির সোঁদা গন্ধ”) and his training under Guru Abhijit Basu.",
    tags: ["4th Studio Album", "Guru Abhijit Basu", "Kolkata Press Club", "Newspaper Feature"]
  },
  {
    id: "ach-8",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/4.jpeg",
    badge: "ARTIST BIOGRAPHY • PRINT FEATURE",
    meta: "EDITORIAL SPOTLIGHT • FOLK LINEAGE & NATIONAL TOURS",
    title: "“মাটির টানে মাটির গানে নবীন শিল্পী মৈনাক” — Full Profile Feature",
    desc: "In-depth newspaper profile chronicling Mainak’s transition from an Eastern Railway footballer to a devoted folk vocalist trained under Late Kamal Chowdhury & Guru Abhijit Basu, performing across Mumbai, Delhi, Bengaluru, Hyderabad, and Ahmedabad.",
    tags: ["Biographical Feature", "National Concerts", "Guru Abhijit Basu", "Ektara & Khamak"]
  },
  {
    id: "ach-9",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/7- kalo.jpeg",
    badge: "SAPTAHIK BARTAMAN • MAGAZINE",
    meta: "16 JANUARY 2021 • JHUMUR MUSIC VIDEO FEATURE",
    title: "“কালো জলে কুচলা তলে” — Saptahik Bartaman Special Coverage",
    desc: "Featured in Saptahik Bartaman (Page 59) celebrating Mainak Paladhi’s Jhumur music video album ‘Kalo Jole Kuchla Tole’, paying tribute to his Medinipur roots with music by Subhendu Das and cinematography by Sudipta Mitra.",
    tags: ["Saptahik Bartaman", "Kalo Jole Kuchla Tole", "Jhumur Song", "Medinipur Roots"]
  },
  {
    id: "ach-10",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/8.jpeg",
    badge: "EI SAMAY • NEWSPAPER FEATURE",
    meta: "NEW YEAR RELEASE • SAGARIKA MUSIC VIDEO",
    title: "“ঝুমুর গানে” — Ei Samay Feature on ‘Kalo Jole Kuchla Tole’",
    desc: "Covered by Ei Samay with a striking portrait of Mainak playing the traditional Dhamsa drum for his New Year Jhumur music video release on Sagarika Music.",
    tags: ["Ei Samay", "Dhamsa Drum", "Jhumur Music Video", "Sagarika Music"]
  },
  {
    id: "ach-11",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/9- kali.jpeg",
    badge: "EI SAMAY (ANYA SAMAY) • TRIBUTE",
    meta: "COMPOSED BY KALYAN SEN BARAT • LYRICS SUBHO DASGUPTA",
    title: "“কালিকাপ্রসাদের জন্য গান প্রকাশ” — Tribute to Kalikaprasad Bhattacharya",
    desc: "Featured in Ei Samay (Anya Samay) as Mainak Paladhi recorded the heartfelt tribute song ‘Prasad Bondhu Re’ dedicated to late folk icon Kalikaprasad Bhattacharya, composed by legendary maestro Kalyan Sen Barat.",
    tags: ["Kalikaprasad Tribute", "Kalyan Sen Barat", "Prasad Bondhu Re", "Anya Samay"]
  },
  {
    id: "ach-12",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/5.jpeg",
    badge: "CRITIC REVIEW • সি ডি • ভি সি ডি",
    meta: "MUSIC REVIEW BY SHYAMAL BOSE • SAGARIKA MUSIC",
    title: "Critical Acclaim for ‘Bhitor Bahire’ — CD & VCD Review Column",
    desc: "Music critic Shyamal Bose praises Mainak’s soulful folk delivery across ‘Kalo Jole Kuchla Tole’, ‘Nesha Lagilo Re’, and ‘Ami Sararat Nouka Baiya’, applauding his preservation of authentic folk traditions.",
    tags: ["Critic Review", "Shyamal Bose", "Bhitor Bahire", "Folk Anthology"]
  },
  {
    id: "ach-13",
    type: "image",
    category: "PRESS",
    src: "assets/achievements/6.jpeg",
    badge: "PRESS COLUMN • গানে-গানে",
    meta: "MEDIA REVIEW • BAUL, JHUMUR, BHATIYALI & SUFI",
    title: "“গানে-গানে — ভিতর বাহিরে” — Press Spotlight on Mainak’s Vocal Range",
    desc: "Newspaper column highlighting how Baul, Jhumur, Bhatiyali, Sufi, and the timeless ‘Ei Padma Ei Meghna’ reached a new artistic dimension in Mainak Paladhi’s voice.",
    tags: ["Gane Gane Column", "Ei Padma Ei Meghna", "Baul & Bhatiyali", "Press Review"]
  },
  {
    id: "ach-14",
    type: "image",
    category: "AWARDS",
    src: "assets/achievements/award-2.PNG",
    badge: "OFFICIAL DELEGATE • DIFF 2026",
    meta: "11TH DURGAPUR INTERNATIONAL FILM FESTIVAL • NANDAN KOLKATA",
    title: "Official Festival Delegate Honor — 11th DIFF at Nandan, Kolkata",
    desc: "Official Delegate credential presented to Mainak Paladhi at the 11th Durgapur International Film Festival held at Nandan, Kolkata.",
    tags: ["Official Delegate", "Nandan Kolkata", "11th DIFF", "Film Festival"]
  },
  {
    id: "ach-15",
    type: "video",
    category: "VIDEOS",
    videoSrc: "assets/achievements/award-2.MP4",
    badge: "AWARD CEREMONY VIDEO 01",
    meta: "LIVE FELICITATION FOOTAGE • FILM FESTIVAL STAGE",
    title: "Award Ceremony & Trophy Presentation — Live Stage Video 01",
    desc: "Watch Mainak Paladhi receiving his film festival award trophy on stage amidst applause from the jury and audience.",
    tags: ["Ceremony Video", "Award Stage", "Live Honors", "Mainak Paladhi"]
  },
  {
    id: "ach-16",
    type: "video",
    category: "VIDEOS",
    videoSrc: "assets/achievements/award-3.MP4",
    badge: "AWARD CEREMONY VIDEO 02",
    meta: "OFFICIAL RECOGNITION • TROPHY & CERTIFICATE HONORS",
    title: "Festival Honors & Felicitation Highlights — Live Stage Video 02",
    desc: "Exclusive video glimpse from the award ceremony celebrating Mainak Paladhi’s Best Singer & Best Music Video victory.",
    tags: ["Award Ceremony", "Best Singer Win", "Festival Highlight", "Live Video"]
  }
];

function initAchievementsSection() {
  const grid = document.getElementById("achievementsGrid");
  const viewport = document.getElementById("achievementsViewport");
  const filterTabs = document.getElementById("achievementsFilterTabs");
  const prevBtn = document.getElementById("achSliderPrev");
  const nextBtn = document.getElementById("achSliderNext");
  const statusEl = document.getElementById("achSliderStatus");
  const dotsContainer = document.getElementById("achievementsSliderDots");
  if (!grid) return;

  let currentItems = [...achievementsData];
  let slideIndex = 0;
  let autoSlideTimer = null;
  let isPaused = false;
  const AUTO_SLIDE_MS = 3000; // Slide automatically every 3 seconds

  function getVisibleCardsCount() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 900) return 2;
    if (w <= 1200) return 3;
    return 5; // 5 cards visible in a row on desktop
  }

  function getMaxSlideIndex() {
    const visible = getVisibleCardsCount();
    return Math.max(0, currentItems.length - visible);
  }

  function updateSliderPosition() {
    const cards = grid.querySelectorAll(".achievement-card");
    const maxIdx = getMaxSlideIndex();
    if (slideIndex > maxIdx) slideIndex = 0;
    if (slideIndex < 0) slideIndex = maxIdx;

    if (!cards.length) {
      grid.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const firstCard = cards[0];
    const trackStyle = window.getComputedStyle(grid);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "16") || 16;
    const stepWidth = firstCard.getBoundingClientRect().width + gap;
    const offset = slideIndex * stepWidth;

    grid.style.transform = `translate3d(-${offset}px, 0, 0)`;

    if (statusEl) {
      const cur = String( Math.min(slideIndex + 1, currentItems.length) ).padStart(2, "0");
      const tot = String(currentItems.length).padStart(2, "0");
      statusEl.textContent = `${cur} / ${tot}`;
    }

    if (dotsContainer) {
      dotsContainer.querySelectorAll(".ach-slider-dot").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === slideIndex);
      });
    }
  }

  function renderDots() {
    if (!dotsContainer) return;
    const maxIdx = getMaxSlideIndex();
    const totalStops = maxIdx + 1;
    if (totalStops <= 1) {
      dotsContainer.innerHTML = "";
      return;
    }

    dotsContainer.innerHTML = Array.from({ length: totalStops }, (_, idx) => `
      <button
        type="button"
        class="ach-slider-dot ${idx === slideIndex ? "active" : ""}"
        data-ach-slide="${idx}"
        aria-label="Go to slide ${idx + 1}"
      ></button>
    `).join("");

    dotsContainer.querySelectorAll(".ach-slider-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        slideIndex = Number(dot.dataset.achSlide);
        updateSliderPosition();
        restartAutoSlide();
      });
    });
  }

  function nextSlide() {
    const maxIdx = getMaxSlideIndex();
    if (maxIdx <= 0) return;
    slideIndex = slideIndex >= maxIdx ? 0 : slideIndex + 1;
    updateSliderPosition();
  }

  function prevSlide() {
    const maxIdx = getMaxSlideIndex();
    if (maxIdx <= 0) return;
    slideIndex = slideIndex <= 0 ? maxIdx : slideIndex - 1;
    updateSliderPosition();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      if (isPaused) return;
      const lightboxModal = document.getElementById("lightboxModal");
      const videoModal = document.getElementById("videoModal");
      if ((lightboxModal && lightboxModal.open) || (videoModal && videoModal.open)) {
        return;
      }
      nextSlide();
    }, AUTO_SLIDE_MS);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function restartAutoSlide() {
    startAutoSlide();
  }

  function renderAchievements(category = "ALL") {
    currentItems =
      category === "ALL"
        ? [...achievementsData]
        : achievementsData.filter((item) => item.category === category);

    slideIndex = 0;

    // Build photo-only list for smooth Prev/Next Lightbox browsing inside Achievements
    const imageItems = currentItems.filter((item) => item.type === "image");

    grid.innerHTML = currentItems
      .map((item) => {
        if (item.type === "video") {
          return `
          <article
            class="achievement-card achievement-video-card is-visible"
            data-cursor="play"
            data-video-url="${item.videoSrc}"
            data-video-title="${item.title}"
            tabindex="0"
            role="button"
            aria-label="Play award ceremony video: ${item.title}"
          >
            <div class="achievement-img-wrap achievement-video-wrap">
              <video
                src="${item.videoSrc}#t=0.5"
                class="achievement-img achievement-video-preview"
                muted
                loop
                playsinline
                preload="metadata"
              ></video>
              <div class="achievement-img-overlay">
                <span class="achievement-badge">${item.badge}</span>
                <div class="video-card-play achievement-play-btn">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                </div>
                <span class="achievement-zoom-pill">WATCH CEREMONY VIDEO &nearr;</span>
              </div>
            </div>

            <div class="achievement-body">
              <div class="achievement-meta-row">
                <span>${item.meta}</span>
              </div>
              <h3 class="achievement-title">${item.title}</h3>
              <p class="achievement-desc">${item.desc}</p>
              <div class="achievement-tags">
                ${item.tags.map((t) => `<span>${t}</span>`).join("")}
              </div>
            </div>
          </article>
        `;
        }

        const imageIndex = imageItems.findIndex((img) => img.id === item.id);

        return `
        <article
          class="achievement-card is-visible"
          data-cursor="view"
          data-ach-img-index="${imageIndex}"
          tabindex="0"
          role="button"
          aria-label="View full resolution achievement: ${item.title}"
        >
          <div class="achievement-img-wrap">
            <img
              src="${item.src}"
              alt="${item.title}"
              class="achievement-img"
              loading="lazy"
              width="640"
              height="760"
            >
            <div class="achievement-img-overlay">
              <span class="achievement-badge">${item.badge}</span>
              <span class="achievement-zoom-pill">CLICK TO INSPECT &nearr;</span>
            </div>
          </div>

          <div class="achievement-body">
            <div class="achievement-meta-row">
              <span>${item.meta}</span>
            </div>
            <h3 class="achievement-title">${item.title}</h3>
            <p class="achievement-desc">${item.desc}</p>
            <div class="achievement-tags">
              ${item.tags.map((t) => `<span>${t}</span>`).join("")}
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // Bind Lightbox with full Prev/Next navigation across achievement images
    grid.querySelectorAll("[data-ach-img-index]").forEach((card) => {
      const idx = Number(card.dataset.achImgIndex);
      const openAchLightbox = () => {
        if (typeof window.openCollectionLightbox === "function") {
          window.openCollectionLightbox(
            idx,
            imageItems.map((img) => ({
              src: img.src,
              title: `${img.title} — ${img.meta}`,
              category: img.badge
            }))
          );
        }
      };

      card.addEventListener("click", openAchLightbox);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openAchLightbox();
        }
      });
    });

    // Bind hover video preview for ceremony video cards
    grid.querySelectorAll(".achievement-video-card").forEach((card) => {
      const previewVideo = card.querySelector("video.achievement-video-preview");
      if (!previewVideo) return;
      card.addEventListener("mouseenter", () => {
        previewVideo.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        previewVideo.pause();
      });
    });

    renderDots();
    requestAnimationFrame(() => {
      updateSliderPosition();
    });
    restartAutoSlide();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (viewport) {
    viewport.addEventListener("mouseenter", () => {
      isPaused = true;
    });
    viewport.addEventListener("mouseleave", () => {
      isPaused = false;
    });
  }

  window.addEventListener("resize", () => {
    renderDots();
    updateSliderPosition();
  });

  if (filterTabs) {
    filterTabs.querySelectorAll("[data-achievement-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterTabs.querySelectorAll(".filter-tab").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        renderAchievements(btn.dataset.achievementFilter);
      });
    });
  }

  renderAchievements("ALL");
}

document.addEventListener("DOMContentLoaded", () => {
  renderVideosGrid();
  initVideoModal();
  initPhotoGallery();
  initAchievementsSection();
});

