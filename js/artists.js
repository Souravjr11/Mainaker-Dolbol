/**
 * ==========================================================================
 * MAINAKER DOLBOL — ARTISTS DATA & INTERACTIVE PROFILE SYSTEM
 * File: js/artists.js
 * ==========================================================================
 * REPLACE ARTIST PHOTOS, BIOGRAPHIES, SOCIAL LINKS & YOUTUBE URLS BELOW
 */

const artists = [
  {
    id: 1,
    number: "01",
    shortName: "MAINAK",
    name: "Mainak Paladhi",
    role: "Founder & Lead Vocalist",
    image: "assets/artists/artist-vocalist-2.jpeg",
    shortBio: "Founder, visionary & soulful Lokogiti voice whose name and heritage gave birth to MAINAKER DOLBOL.",
    bio: "The founder, namesake, and lead vocalist of MAINAKER DOLBOL, Mainak Paladhi commands the stage with magnetic folk authenticity. Trained under revered Lokogiti Guru Abhijit Basu and acclaimed for his album 'Bhitor Bahire' (Sagarika Music), his voice and Khamak anchor the collective's soul.",
    quote: "লোকগান আমার শিকড়, আর মঞ্চ আমার উপাসনা — মাটির সোঁদা গন্ধটুকু মানুষের হৃদয়ে পৌঁছে দেওয়াই আমার সাধনা।",
    yearsActive: "Founder — Present",
    instrument: "Lead Vocals, Khamak & Folk Storytelling",
    featuredPerformance: "Kolkata Press Club Unveiling & Live Concert Stage",
    album: "Bhitor Bahire (ভিতর বাহিরে)",
    youtube: "assets/videos/1.mp4",
    facebook: "https://www.facebook.com/share/1DDwKqPQd1/",
    instagram: "https://www.instagram.com/mainakpaladhi?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  {
    id: 2,
    number: "02",
    shortName: "ARIJIT",
    name: "Arijit Talukder",
    role: "Tabla Player",
    image: "assets/artists/artist-tabla.jpeg",
    shortBio: "Masterful classical and folk Tabla rhythms fused with dynamic live concert energy.",
    bio: "Arijit Talukder brings intricate classical taal and earthy folk percussion to MAINAKER DOLBOL. His expressive command over the Tabla bridges traditional Bengali Lokogiti grooves with high-energy contemporary stage arrangements.",
    quote: "Rhythm is the heartbeat that convinces six different minds to breathe as one.",
    yearsActive: "Core Member — Present",
    instrument: "Classical & Folk Tabla, Hand Percussion",
    featuredPerformance: "Live Concert Stage — Classical & Folk Rhythm Showcase",
    album: "Bhitor Bahire Live",
    facebook: "https://www.facebook.com/share/1Fk47RaGLA/",
    instagram: "https://www.instagram.com/talukder.tuhin?stkn=a3A1b3E4dGg4bTJx",
  },
  {
    id: 3,
    number: "03",
    shortName: "SANJAY",
    name: "Sanjay Seal",
    role: "Lead Guitarist",
    image: "assets/artists/artist-guiterist.jpeg",
    shortBio: "Architect of atmospheric walls of sound, blending soaring folk-rock leads with expressive acoustic & electric riffs.",
    bio: "Sanjay Seal shapes the harmonic and melodic spine of MAINAKER DOLBOL. Blending soulful acoustic fingerstyle with soaring electric guitar solos, he weaves contemporary rock energy seamlessly around traditional Bengali folk melodies.",
    quote: "A guitar note shouldn't just fill a room — it should alter the gravity inside it.",
    yearsActive: "Core Member — Present",
    instrument: "Electric & Acoustic Lead Guitars",
    featuredPerformance: "Live Concert Set — Folk-Rock Extended Guitar Solo",
    album: "Mainaker Dolbol Live",
    facebook: "https://www.facebook.com/share/1DvyVG1iHe/",
  },
  {
    id: 4,
    number: "04",
    shortName: "SUPRATIM",
    name: "Supratim Bhattacharya",
    role: "Octapadist",
    image: "assets/artists/artist-octopad.jpeg",
    shortBio: "Dynamic electronic percussionist driving high-energy rhythms and modern beats on the Octopad.",
    bio: "Supratim Bhattacharya powers the modern rhythmic pulse of MAINAKER DOLBOL on the Octopad. Blending crisp electronic percussion pads with traditional folk grooves alongside the tabla, his dynamic beats give every live concert arrangement an infectious energy.",
    quote: "Every pad strike sparks the pulse of the live stage.",
    yearsActive: "Core Member — Present",
    instrument: "Roland Octopad & Electronic Percussion",
    featuredPerformance: "Live Stage Session — Octopad & Folk Rhythm Groove",
    album: "Mainaker Dolbol Sessions",
    facebook: "https://www.facebook.com/share/1BpKS4hrJt/",
  },
  {
    id: 5,
    number: "05",
    shortName: "UDAYAN",
    name: "Udayan Chakraborty",
    role: "Keyboardist",
    image: "assets/artists/artist-keyboardist.jpeg",
    shortBio: "Synthesizer alchemist and keyboardist crafting lush harmonic layers and soulful folk-fusion arrangements.",
    bio: "Udayan Chakraborty surrounds MAINAKER DOLBOL in rich, widescreen keyboard and synthesizer textures. From warm harmonium and acoustic piano tones to modern atmospheric pads, he paints the harmonic colors behind every song.",
    quote: "Between acoustic keys and modern synth textures lies an entire universe of mood.",
    yearsActive: "Core Member — Present",
    instrument: "Keyboards, Piano & Synthesizer Arrangements",
    featuredPerformance: "Live Concert — Solo Keyboard & Folk Prelude",
    album: "Mainaker Dolbol Live",
    facebook: "https://www.facebook.com/share/1CL1S2UKjy/",
    instagram: "https://www.instagram.com/udayan811?stkn=MWJrMHp1aXpvN2ls",
  },
  {
    id: 6,
    number: "06",
    shortName: "LAGAN",
    name: "Lagan Dasgupta",
    role: "Flutist",
    image: "assets/artists/flute-1.jpeg",
    shortBio: "Soulful classical and folk flute virtuoso weaving emotive melodies and atmospheric depth into live concert soundscapes.",
    bio: "Lagan Dasgupta breathes enchanting classical and folk melodic soul into MAINAKER DOLBOL on the flute. With emotive tonal purity, intricate alaps, and soaring folk improvisations, his flute melodies weave a captivating spiritual and atmospheric depth across every live performance.",
    quote: "The flute is the breath of the soul made audible across the wind.",
    yearsActive: "Core Member — Present",
    instrument: "Classical Flute & Indian Bansuri",
    featuredPerformance: "Live Concert Stage — Classical & Folk Flute Solo",
    album: "Mainaker Dolbol Live Sessions",
    youtube: "assets/videos/1.mp4",
    facebook: "https://www.facebook.com/share/1JMh3QmkBo/",
    instagram: "https://www.instagram.com/dasguptalagan?stkn=bjVueHZ5c3YyZnp4",
  },
  {
    id: 7,
    number: "07",
    shortName: "SUBHA",
    name: "Subha Chatterjee",
    role: "Full Band Manager",
    image: "assets/artists/manager.jpeg",
    shortBio: "Full Band Manager overseeing concert bookings, tour operations, stage production, and collective direction for MAINAKER DOLBOL.",
    bio: "Subha Chatterjee is the Full Band Manager and organizational backbone of MAINAKER DOLBOL. Steering all concert bookings, festival appearances, stage production, and tour logistics, his leadership ensures every show delivers a seamless, world-class live experience.",
    quote: "Great music moves the soul — great management makes sure the stage is ready for the magic.",
    yearsActive: "Full Band Manager — Present",
    instrument: "Full Band Management, Concert Production & Percussion",
    featuredPerformance: "Tour Direction & Headline Festival Production",
    album: "Mainaker Dolbol Collective",
    facebook: "https://www.facebook.com/share/1HAEX8DTk3/",
    instagram: "https://www.instagram.com/subhochatterjee93?stkn=MWZwdWkwMGQ5YXNyeA==",
  }
];

/**
 * Render the 6 Artist Profile Cards into #artistsGrid
 */
function renderArtistsGrid() {
  const grid = document.getElementById("artistsGrid");
  if (!grid) return;

  grid.innerHTML = artists
    .map(
      (artist, idx) => `
      <article
        class="artist-card reveal-up"
        style="--delay: ${(idx % 3) * 0.1}s;"
        data-artist-id="${artist.id}"
        data-cursor="view"
        tabindex="0"
        role="button"
        aria-label="View profile of ${artist.name}, ${artist.role}"
      >
        <div class="artist-portrait-wrap">
          <span class="artist-number-badge">${artist.number}</span>
          <button
            type="button"
            class="artist-hover-play"
            data-artist-video="${artist.youtube}"
            data-artist-video-title="${artist.name} — ${artist.featuredPerformance}"
            aria-label="Watch ${artist.name} featured performance"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
          </button>
          <img
            src="${artist.image}"
            alt="${artist.name} — ${artist.role} of MAINAKER DOLBOL"
            class="artist-portrait"
            loading="lazy"
            width="600"
            height="760"
          >
          <div class="artist-card-gradient" aria-hidden="true"></div>
        </div>

        <div class="artist-card-body">
          <span class="artist-role-tag">${artist.role}</span>
          <h3 class="artist-name">${artist.name}</h3>
          <span class="artist-accent-line" aria-hidden="true"></span>
          <p class="artist-short-bio">${artist.shortBio}</p>

          <div class="artist-card-footer">
            <div class="artist-mini-socials" onclick="event.stopPropagation();">
              ${artist.instagram ? `<a href="${artist.instagram}" target="_blank" rel="noopener noreferrer" aria-label="${artist.name} Instagram">IG</a>` : ""}
              ${artist.facebook ? `<a href="${artist.facebook}" target="_blank" rel="noopener noreferrer" aria-label="${artist.name} Facebook">FB</a>` : ""}
              <a href="https://www.youtube.com/@mainak311" target="_blank" rel="noopener noreferrer" aria-label="${artist.name} YouTube">YT</a>
            </div>
            <span class="artist-profile-btn">
              VIEW PROFILE <span>&rarr;</span>
            </span>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  // Bind card click events
  grid.querySelectorAll(".artist-card").forEach((card) => {
    const id = Number(card.dataset.artistId);

    card.addEventListener("click", (e) => {
      const videoBtn = e.target.closest(".artist-hover-play");
      if (videoBtn) {
        e.stopPropagation();
        if (typeof window.openVideoModal === "function") {
          window.openVideoModal(
            videoBtn.dataset.artistVideo,
            videoBtn.dataset.artistVideoTitle
          );
        }
        return;
      }
      openArtistModal(id);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openArtistModal(id);
      }
    });
  });
}

/**
 * Render Interactive Artist Selector & Dynamic Spotlight Stage (#artist-spotlight)
 */
function initArtistInteractiveSpotlight() {
  const selectorBar = document.getElementById("artistSelectorBar");
  const stage = document.getElementById("artistSpotlightStage");
  if (!selectorBar || !stage) return;

  selectorBar.innerHTML = artists
    .map(
      (artist, index) => `
      <button
        type="button"
        class="artist-selector-btn ${index === 0 ? "active" : ""}"
        data-select-artist="${artist.id}"
        role="tab"
        aria-selected="${index === 0 ? "true" : "false"}"
      >
        <span>${artist.number}</span> ${artist.shortName}
      </button>
    `
    )
    .join("");

  function updateSpotlight(artistId, animate = true) {
    const artist = artists.find((a) => a.id === Number(artistId)) || artists[0];

    const renderHTML = () => {
      stage.innerHTML = `
        <div class="spotlight-grid">
          <div class="spotlight-portrait-col">
            <img src="${artist.image}" alt="${artist.name} — ${artist.role}" loading="lazy" width="700" height="800">
            <span class="spotlight-number-watermark" aria-hidden="true">${artist.number}</span>
          </div>

          <div class="spotlight-info-col">
            <span class="spotlight-eyebrow">ARTIST ${artist.number} // ${artist.role.toUpperCase()}</span>
            <h3 class="spotlight-name">${artist.name}</h3>
            <blockquote class="spotlight-quote">&ldquo;${artist.quote}&rdquo;</blockquote>
            <p class="spotlight-bio">${artist.bio}</p>

            <div class="spotlight-specs">
              <div class="spec-box">
                <span>FAVORITE INSTRUMENT</span>
                <strong>${artist.instrument}</strong>
              </div>
              <div class="spec-box">
                <span>BEST ALBUM</span>
                <strong>${artist.album}</strong>
              </div>
              <div class="spec-box">
                <span>YEARS ACTIVE</span>
                <strong>${artist.yearsActive}</strong>
              </div>
            </div>

            <div class="spotlight-actions">
              <button
                type="button"
                class="btn btn-primary"
                data-cursor="play"
                onclick="window.openVideoModal && window.openVideoModal('${artist.youtube}', '${artist.name} — ${artist.featuredPerformance.replace(/'/g, "\\'")}')"
              >
                <span>WATCH FEATURED SESSION</span>
              </button>

              <button
                type="button"
                class="btn btn-outline"
                onclick="openArtistModal(${artist.id})"
              >
                <span>FULL DOSSIER</span>
              </button>

              <div class="artist-mini-socials" style="margin-left: auto;">
                ${artist.instagram ? `<a href="${artist.instagram}" target="_blank" rel="noopener noreferrer" aria-label="${artist.name} Instagram">INSTAGRAM &nearr;</a>` : ""}
                ${artist.facebook ? `<a href="${artist.facebook}" target="_blank" rel="noopener noreferrer" aria-label="${artist.name} Facebook">FACEBOOK &nearr;</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      `;
    };

    if (animate) {
      stage.classList.add("is-switching");
      setTimeout(() => {
        renderHTML();
        stage.classList.remove("is-switching");
      }, 220);
    } else {
      renderHTML();
    }
  }

  // Initial render
  updateSpotlight(artists[0].id, false);

  // Selector button click listeners
  selectorBar.querySelectorAll(".artist-selector-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectorBar.querySelectorAll(".artist-selector-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      updateSpotlight(btn.dataset.selectArtist, true);
    });
  });
}

/**
 * Open Artist Detail Modal (#artistModal)
 */
function openArtistModal(artistId) {
  const artist = artists.find((a) => a.id === Number(artistId));
  const modal = document.getElementById("artistModal");
  const container = document.getElementById("artistModalContent");
  if (!artist || !modal || !container) return;

  container.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="modal-eyebrow">ARTIST DOSSIER // ${artist.number}</span>
        <h2 class="modal-title" id="artistModalName">${artist.name}</h2>
      </div>
      <button type="button" class="modal-close-btn" data-close-modal="artistModal" aria-label="Close artist profile modal">
        <span>ESC</span> &times;
      </button>
    </div>

    <div class="artist-modal-grid">
      <div class="artist-modal-portrait">
        <img src="${artist.image}" alt="${artist.name} portrait" width="600" height="740">
      </div>

      <div class="artist-modal-details">
        <span class="section-label">${artist.role}</span>
        <blockquote class="spotlight-quote">&ldquo;${artist.quote}&rdquo;</blockquote>
        <p class="spotlight-bio">${artist.bio}</p>

        <div class="spotlight-specs">
          <div class="spec-box">
            <span>YEARS ACTIVE</span>
            <strong>${artist.yearsActive}</strong>
          </div>
          <div class="spec-box">
            <span>SIGNATURE GEAR</span>
            <strong>${artist.instrument}</strong>
          </div>
          <div class="spec-box">
            <span>BEST ALBUM</span>
            <strong>${artist.album}</strong>
          </div>
        </div>

        <div class="spec-box" style="margin-bottom: 1.5rem;">
          <span>FEATURED PERFORMANCE</span>
          <strong>${artist.featuredPerformance}</strong>
        </div>

        <div class="spotlight-actions">
          <button
            type="button"
            class="btn btn-primary"
            id="modalWatchArtistVideo"
          >
            <span>WATCH ON YOUTUBE</span>
          </button>
          ${artist.instagram ? `
            <a href="${artist.instagram}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <span>INSTAGRAM &nearr;</span>
            </a>
          ` : ""}
          ${artist.facebook ? `
            <a href="${artist.facebook}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
              <span>FACEBOOK &nearr;</span>
            </a>
          ` : ""}
        </div>
      </div>
    </div>
  `;

  const closeBtn = container.querySelector('[data-close-modal="artistModal"]');
  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.close());
  }

  const watchBtn = container.querySelector("#modalWatchArtistVideo");
  if (watchBtn) {
    watchBtn.addEventListener("click", () => {
      modal.close();
      if (typeof window.openVideoModal === "function") {
        window.openVideoModal(
          artist.youtube,
          `${artist.name} — ${artist.featuredPerformance}`
        );
      }
    });
  }

  if (typeof modal.showModal === "function") {
    modal.showModal();
  }
}

window.openArtistModal = openArtistModal;

document.addEventListener("DOMContentLoaded", () => {
  renderArtistsGrid();
  initArtistInteractiveSpotlight();
});

