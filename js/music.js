/**
 * ==========================================================================
 * MAINAKER DOLBOL — YOUTUBE SOUND ARCHIVE & STUDIO VIDEO/MUSIC CONSOLE
 * File: js/music.js
 * ==========================================================================
 */

const youtubeReleases = [
  {
    id: 1,
    index: "01",
    videoId: "0NZubfddbtY",
    youtubeUrl: "https://youtu.be/0NZubfddbtY?si=f-R5aglmQ3InealW",
    shortTitle: "TOMARO ASHIME",
    title: "Tomaro Ashime (তোমার অসীমে)",
    year: "YOUTUBE",
    artist: "MAINAK PALADHI • Feat. Abir Bose & Sumanta Saha",
    genre: "Rabindrasangeet",
    badge: "RABINDRASANGEET • COVER",
    tracksLabel: "YOUTUBE RELEASE",
    duration: "04:12",
    thumbnail: "https://i.ytimg.com/vi/0NZubfddbtY/hqdefault.jpg"
  },
  {
    id: 2,
    index: "02",
    videoId: "9IAXWS-TFtQ",
    youtubeUrl: "https://youtu.be/9IAXWS-TFtQ?si=U0gwc3-vMQqTjCrk",
    shortTitle: "AHA KI ANANDA",
    title: "Aha Ki Ananda Akashe Batashe",
    year: "YOUTUBE",
    artist: "MAINAK PALADHI • Official Vocal Performance",
    genre: "Rabindrasangeet",
    badge: "RABINDRASANGEET • LIVE",
    tracksLabel: "YOUTUBE RELEASE",
    duration: "03:45",
    thumbnail: "https://i.ytimg.com/vi/9IAXWS-TFtQ/hqdefault.jpg"
  },
  {
    id: 3,
    index: "03",
    videoId: "v4T8Tfcnxm4",
    youtubeUrl: "https://youtu.be/v4T8Tfcnxm4?si=jqUuCXkPiXutf9t2",
    shortTitle: "DEKHECHI RUPSAGORE",
    title: "Dekhechi Rupsagore Moner Manush (দেখেছি রূপসাগরে মনের মানুষ)",
    year: "YOUTUBE",
    artist: "MAINAK PALADHI • Baul & Folk Fusion",
    genre: "Baul & Lokogiti",
    badge: "BAUL & LOKOGITI • FOLK",
    tracksLabel: "YOUTUBE RELEASE",
    duration: "04:38",
    thumbnail: "https://i.ytimg.com/vi/v4T8Tfcnxm4/hqdefault.jpg"
  },
  {
    id: 4,
    index: "04",
    videoId: "vwWK3v9OAzQ",
    youtubeUrl: "https://youtu.be/vwWK3v9OAzQ?si=My7XBl_VwLrSLiI_",
    shortTitle: "KICHUDIN MONE MONE",
    title: "Kichudin Mone Mone (কিছুদিন মনে মনে)",
    year: "YOUTUBE",
    artist: "MAINAK PALADHI • Soulful Acoustic Session",
    genre: "Contemporary Melodies",
    badge: "BENGALI MELODY • SESSION",
    tracksLabel: "YOUTUBE RELEASE",
    duration: "03:56",
    thumbnail: "https://i.ytimg.com/vi/vwWK3v9OAzQ/hqdefault.jpg"
  },
  {
    id: 5,
    index: "05",
    videoId: "1v-6fqJ4lRw",
    youtubeUrl: "https://youtu.be/1v-6fqJ4lRw?si=G0yToz9EnbTexekd",
    shortTitle: "AZARBAIJAN",
    title: "Azarbaijan — RD Burman & Asha Bhosle Tribute",
    year: "YOUTUBE",
    artist: "MAINAK PALADHI & SANGEETA BASU ROY",
    genre: "Retro Duet Cover",
    badge: "RD BURMAN TRIBUTE • DUET",
    tracksLabel: "YOUTUBE RELEASE",
    duration: "04:20",
    thumbnail: "https://i.ytimg.com/vi/1v-6fqJ4lRw/hqdefault.jpg"
  },
  {
    id: 6,
    index: "06",
    videoId: "Ys0UJDDi3BQ",
    youtubeUrl: "https://youtu.be/Ys0UJDDi3BQ?si=mkBnMi5ygvabm4bz",
    shortTitle: "CHADER GAYE CHAD",
    title: "Chader Gaye Chad Legeche (চাঁদের গায়ে চাঁদ লেগেছে)",
    year: "YOUTUBE",
    artist: "MAINAK PALADHI • Bangla Folk Song (Lalon Geeti)",
    genre: "Lalon Geeti Folk",
    badge: "LALON GEETI • BANGLA FOLK",
    tracksLabel: "YOUTUBE RELEASE",
    duration: "04:45",
    thumbnail: "https://i.ytimg.com/vi/Ys0UJDDi3BQ/hqdefault.jpg"
  }
];

/**
 * Format seconds into M:SS
 */
function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/**
 * Upgrade YouTube hqdefault thumbnail to maxresdefault if a true HD thumbnail exists
 */
function upgradeYoutubeThumbnail(imgEl, videoId) {
  if (!imgEl || !videoId) return;
  const maxResUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const probe = new Image();
  probe.onload = () => {
    // YouTube returns a 120x90 placeholder when maxresdefault does not exist
    if (probe.naturalWidth > 120) {
      imgEl.src = maxResUrl;
    }
  };
  probe.src = maxResUrl;
}

/**
 * Render Discography / Sound Archive Grid (#albumsGrid) with YouTube Thumbnails
 */
function renderAlbumsGrid() {
  const grid = document.getElementById("albumsGrid");
  if (!grid) return;

  grid.innerHTML = youtubeReleases
    .map(
      (item, idx) => `
      <article class="album-card reveal-up" style="--delay: ${(idx % 3) * 0.1}s;">
        <div class="album-cover-wrap">
          <span class="album-index-tag">${item.index} &mdash; ${item.year}</span>
          <img
            src="${item.thumbnail}"
            alt="${item.title} — YouTube thumbnail by ${item.artist}"
            class="album-cover-img"
            data-yt-thumb-id="${item.videoId}"
            loading="lazy"
            width="600"
            height="600"
          >
          <div class="album-cover-overlay">
            <button
              type="button"
              class="album-play-btn"
              data-cursor="play"
              data-play-song-index="${idx}"
              aria-label="Play ${item.title} in Featured Music player"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
            </button>
          </div>
        </div>

        <div class="album-card-body">
          <div class="album-meta-top">
            <span>${item.genre.toUpperCase()}</span>
            <span>${item.tracksLabel}</span>
          </div>
          <h3 class="album-title">${item.index} &mdash; ${item.shortTitle}</h3>
          <p class="album-artist">${item.title}</p>

          <div class="album-stream-links">
            <button
              type="button"
              class="stream-pill"
              data-play-song-index="${idx}"
            >
              &#9654; PLAY BELOW
            </button>
            <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="stream-pill">
              YOUTUBE &nearr;
            </a>
            <a href="https://www.youtube.com/@mainak311" target="_blank" rel="noopener noreferrer" class="stream-pill">
              CHANNEL &nearr;
            </a>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  // Upgrade thumbnails to HD maxresdefault where available
  grid.querySelectorAll("img[data-yt-thumb-id]").forEach((img) => {
    upgradeYoutubeThumbnail(img, img.dataset.ytThumbId);
  });

  // Bind album play buttons to cue & play the YouTube video inside #music
  grid.querySelectorAll("[data-play-song-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.playSongIndex);
      if (typeof window.playTrackByIndex === "function") {
        window.playTrackByIndex(idx, true);
        const musicSection = document.getElementById("music");
        if (musicSection) {
          musicSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });
}

/**
 * Initialize Custom YouTube-Powered Studio Music Player (#music)
 */
function initMusicPlayer() {
  const consoleEl = document.querySelector(".player-console");
  const artworkEl = document.getElementById("playerArtwork");
  const coverOverlayBtn = document.getElementById("playerCoverPlayOverlay");
  const statusPill = document.getElementById("playerStatusPill");
  const albumNameEl = document.getElementById("playerAlbumName");
  const youtubeLinkEl = document.getElementById("playerYoutubeLink");
  const titleEl = document.getElementById("playerTrackTitle");
  const artistEl = document.getElementById("playerTrackArtist");
  const seekSlider = document.getElementById("playerSeek");
  const seekFill = document.getElementById("playerSeekFill");
  const currentTimeEl = document.getElementById("playerCurrentTime");
  const durationEl = document.getElementById("playerDuration");
  const playBtn = document.getElementById("playerPlayBtn");
  const prevBtn = document.getElementById("playerPrevBtn");
  const nextBtn = document.getElementById("playerNextBtn");
  const muteBtn = document.getElementById("playerMuteBtn");
  const volumeSlider = document.getElementById("playerVolume");
  const playlistContainer = document.getElementById("playlistContainer");

  if (!playlistContainer) return;

  let currentTrackIndex = 0;
  let isPlaying = false;
  let ytPlayer = null;
  let ytReady = false;
  let pendingAutoPlay = false;
  let progressTimer = null;
  let isMuted = false;

  // Render 6-Song Playlist
  function renderPlaylist() {
    playlistContainer.innerHTML = youtubeReleases
      .map(
        (song, idx) => `
        <li
          class="playlist-item ${idx === currentTrackIndex ? "active" : ""}"
          data-track-index="${idx}"
          role="option"
          aria-selected="${idx === currentTrackIndex ? "true" : "false"}"
          tabindex="0"
        >
          <div class="playlist-item-left">
            <span class="playlist-num">${song.index}</span>
            <div class="playlist-track-info">
              <strong>${song.title}</strong>
              <span>${song.badge}</span>
            </div>
          </div>
          <span class="playlist-duration" data-playlist-dur="${idx}">${song.duration}</span>
        </li>
      `
      )
      .join("");

    playlistContainer.querySelectorAll(".playlist-item").forEach((item) => {
      item.addEventListener("click", () => {
        const idx = Number(item.dataset.trackIndex);
        loadTrack(idx, true);
      });
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          loadTrack(Number(item.dataset.trackIndex), true);
        }
      });
    });
  }

  function updateConsoleUI(track) {
    if (artworkEl) {
      artworkEl.src = track.thumbnail;
      artworkEl.alt = `${track.title} — YouTube Thumbnail`;
      upgradeYoutubeThumbnail(artworkEl, track.videoId);
    }
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (albumNameEl) albumNameEl.textContent = track.badge;
    if (youtubeLinkEl) youtubeLinkEl.href = track.youtubeUrl;
    if (durationEl) durationEl.textContent = track.duration;
    if (currentTimeEl) currentTimeEl.textContent = "0:00";
    if (seekSlider) seekSlider.value = 0;
    if (seekFill) seekFill.style.width = "0%";

    playlistContainer.querySelectorAll(".playlist-item").forEach((li, idx) => {
      const active = idx === currentTrackIndex;
      li.classList.toggle("active", active);
      li.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (consoleEl) {
      consoleEl.classList.toggle("is-playing", playing);
      if (playing) {
        consoleEl.classList.add("has-active-video");
      }
    }
    if (statusPill) {
      statusPill.textContent = playing ? "NOW PLAYING" : "PAUSED";
    }
    if (playing) {
      startProgressPolling();
    } else {
      stopProgressPolling();
    }
  }

  function startProgressPolling() {
    stopProgressPolling();
    progressTimer = setInterval(() => {
      if (!ytPlayer || !ytReady || typeof ytPlayer.getCurrentTime !== "function") return;
      const cur = ytPlayer.getCurrentTime() || 0;
      const dur = ytPlayer.getDuration() || 0;
      if (dur > 0) {
        const pct = Math.min(100, (cur / dur) * 100);
        if (seekSlider) seekSlider.value = pct;
        if (seekFill) seekFill.style.width = `${pct}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatAudioTime(cur);
        if (durationEl) durationEl.textContent = formatAudioTime(dur);
        const durBadge = playlistContainer.querySelector(`[data-playlist-dur="${currentTrackIndex}"]`);
        if (durBadge) durBadge.textContent = formatAudioTime(dur);
      }
    }, 250);
  }

  function stopProgressPolling() {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }

  function loadTrack(index, autoPlay = false) {
    currentTrackIndex = (index + youtubeReleases.length) % youtubeReleases.length;
    const track = youtubeReleases[currentTrackIndex];
    updateConsoleUI(track);

    if (ytPlayer && ytReady && typeof ytPlayer.loadVideoById === "function") {
      if (autoPlay) {
        if (consoleEl) consoleEl.classList.add("has-active-video");
        ytPlayer.loadVideoById(track.videoId);
      } else {
        if (consoleEl) consoleEl.classList.remove("has-active-video");
        ytPlayer.cueVideoById(track.videoId);
        setPlayingState(false);
        if (statusPill) statusPill.textContent = "READY TO PLAY";
      }
    } else {
      pendingAutoPlay = autoPlay;
    }
  }

  function togglePlayPause() {
    if (!ytPlayer || !ytReady) {
      pendingAutoPlay = true;
      return;
    }
    if (consoleEl) consoleEl.classList.add("has-active-video");
    const state = typeof ytPlayer.getPlayerState === "function" ? ytPlayer.getPlayerState() : -1;
    if (state === 1) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
  }

  // Expose helper globally for Album cards in #albumsGrid
  window.playTrackByIndex = (idx, autoPlay = true) => {
    loadTrack(idx, autoPlay);
  };

  // Load YouTube IFrame Player API
  function mountYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      createYTPlayer();
      return;
    }

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === "function") prevCallback();
      createYTPlayer();
    };

    if (!document.getElementById("youtubeIframeApiScript")) {
      const tag = document.createElement("script");
      tag.id = "youtubeIframeApiScript";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }

  function createYTPlayer() {
    const mountEl = document.getElementById("ytPlayerMount");
    if (!mountEl) return;

    const initialTrack = youtubeReleases[currentTrackIndex];
    ytPlayer = new window.YT.Player("ytPlayerMount", {
      videoId: initialTrack.videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: (event) => {
          ytReady = true;
          const vol = volumeSlider ? Math.round(Number(volumeSlider.value) * 100) : 85;
          event.target.setVolume(vol);
          if (pendingAutoPlay) {
            pendingAutoPlay = false;
            if (consoleEl) consoleEl.classList.add("has-active-video");
            event.target.playVideo();
          }
        },
        onStateChange: (event) => {
          const YTState = window.YT.PlayerState;
          if (event.data === YTState.PLAYING) {
            setPlayingState(true);
          } else if (event.data === YTState.PAUSED) {
            setPlayingState(false);
          } else if (event.data === YTState.ENDED) {
            loadTrack(currentTrackIndex + 1, true);
          }
        }
      }
    });
  }

  // Controls Event Listeners
  if (playBtn) {
    playBtn.addEventListener("click", togglePlayPause);
  }

  if (coverOverlayBtn) {
    coverOverlayBtn.addEventListener("click", togglePlayPause);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      loadTrack(currentTrackIndex - 1, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      loadTrack(currentTrackIndex + 1, true);
    });
  }

  if (seekSlider) {
    seekSlider.addEventListener("input", () => {
      const pct = Number(seekSlider.value);
      if (seekFill) seekFill.style.width = `${pct}%`;
      if (ytPlayer && ytReady && typeof ytPlayer.getDuration === "function") {
        const dur = ytPlayer.getDuration();
        if (dur > 0) {
          ytPlayer.seekTo((pct / 100) * dur, true);
        }
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      const vol = Math.round(Number(volumeSlider.value) * 100);
      if (ytPlayer && ytReady && typeof ytPlayer.setVolume === "function") {
        ytPlayer.setVolume(vol);
        if (vol === 0) {
          ytPlayer.mute();
          isMuted = true;
        } else if (isMuted) {
          ytPlayer.unMute();
          isMuted = false;
        }
      }
      if (muteBtn) muteBtn.style.opacity = vol === 0 ? "0.45" : "1";
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      if (!ytPlayer || !ytReady) return;
      if (isMuted || ytPlayer.isMuted()) {
        ytPlayer.unMute();
        isMuted = false;
        muteBtn.style.opacity = "1";
      } else {
        ytPlayer.mute();
        isMuted = true;
        muteBtn.style.opacity = "0.45";
      }
    });
  }

  renderPlaylist();
  updateConsoleUI(youtubeReleases[0]);
  if (statusPill) statusPill.textContent = "READY TO PLAY";
  mountYouTubeAPI();
}

document.addEventListener("DOMContentLoaded", () => {
  renderAlbumsGrid();
  initMusicPlayer();
});

