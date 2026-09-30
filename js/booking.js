/**
 * ==========================================================================
 * MAINAKER DOLBOL — CONCERTS / EVENTS & BOOKING MODAL SYSTEM
 * File: js/booking.js
 * ==========================================================================
 * REPLACE WHATSAPP NUMBER, CONCERT DATES & BACKEND ENDPOINT BELOW
 */

// REPLACE WITH REAL WHATSAPP NUMBER (Country code + number, no '+' or spaces)
const WHATSAPP_NUMBER = "917908224010";

// REPLACE WITH REAL CONCERT / EVENT INFORMATION BELOW
const events = [
  {
    id: 1,
    day: "18",
    month: "OCT",
    year: "2026",
    name: "MIDNIGHT LIVE",
    tour: "AFTER DARK WORLD TOUR",
    city: "Kolkata",
    venue: "The Grand Arena",
    time: "8:00 PM",
    status: "upcoming",
    ticketLabel: "TICKETS AVAILABLE",
    badgeClass: "available",
    ctaText: "BOOK TICKETS"
  },
  {
    id: 2,
    day: "07",
    month: "NOV",
    year: "2026",
    name: "SYMPHONY OF SHADOWS",
    tour: "HEADLINE AMPHITHEATRE NIGHT",
    city: "Mumbai",
    venue: "Royal Opera Bay Stage",
    time: "8:30 PM",
    status: "upcoming",
    ticketLabel: "LIMITED VIP LEFT",
    badgeClass: "limited",
    ctaText: "BOOK TICKETS"
  },
  {
    id: 3,
    day: "22",
    month: "NOV",
    year: "2026",
    name: "NOCTURNE SESSIONS LIVE",
    tour: "ACOUSTIC & ANALOG SPECIAL",
    city: "Bengaluru",
    venue: "The Forum Conservatory",
    time: "7:30 PM",
    status: "upcoming",
    ticketLabel: "TICKETS AVAILABLE",
    badgeClass: "available",
    ctaText: "BOOK TICKETS"
  },
  {
    id: 4,
    day: "14",
    month: "DEC",
    year: "2026",
    name: "ECHOES FESTIVAL FINALE",
    tour: "WINTER STADIUM SHOWCASE",
    city: "New Delhi",
    venue: "Indira Arena Bowl",
    time: "9:00 PM",
    status: "upcoming",
    ticketLabel: "SELLING FAST",
    badgeClass: "limited",
    ctaText: "BOOK TICKETS"
  },
  {
    id: 5,
    day: "19",
    month: "AUG",
    year: "2026",
    name: "MONSOON UNFILTERED",
    tour: "SOLD OUT ARCHIVE SHOW",
    city: "Hyderabad",
    venue: "Prism Live Hall",
    time: "8:00 PM",
    status: "past",
    ticketLabel: "SOLD OUT • PAST",
    badgeClass: "archived",
    ctaText: "INQUIRE SIMILAR"
  },
  {
    id: 6,
    day: "04",
    month: "JUL",
    year: "2026",
    name: "FIRST CHAPTER REUNION",
    tour: "ANNIVERSARY CONCERT",
    city: "Kolkata",
    venue: "Park Street Heritage Theatre",
    time: "7:00 PM",
    status: "past",
    ticketLabel: "SOLD OUT • PAST",
    badgeClass: "archived",
    ctaText: "INQUIRE SIMILAR"
  }
];

/**
 * Render Concerts / Events List (#eventsContainer) with Filter Support
 */
function initConcertsSection() {
  const container = document.getElementById("eventsContainer");
  const filterTabs = document.getElementById("concertFilterTabs");
  if (!container) return;

  function renderEvents(filter = "all") {
    const filtered =
      filter === "all"
        ? events
        : events.filter((ev) => ev.status === filter);

    container.innerHTML = filtered
      .map(
        (ev) => `
        <article class="event-card ${ev.status === "past" ? "is-past" : ""} is-visible">
          <div class="event-date-box">
            <span class="event-day">${ev.day}</span>
            <span class="event-month-year">${ev.month} ${ev.year}</span>
          </div>

          <div class="event-main-info">
            <h3 class="event-title">${ev.name}</h3>
            <span class="event-tour-tag">${ev.tour}</span>
          </div>

          <div class="event-location">
            <strong>${ev.city}</strong>
            <span>${ev.venue}</span>
          </div>

          <div class="event-time-status">
            <span class="event-time">${ev.time}</span>
            <span class="ticket-badge ${ev.badgeClass}">${ev.ticketLabel}</span>
          </div>

          <div class="event-cta-col">
            <button
              type="button"
              class="btn ${ev.status === "past" ? "btn-outline" : "btn-primary"} btn-sm"
              data-open-booking="${ev.name} — ${ev.city} (${ev.day} ${ev.month} ${ev.year})"
              data-booking-city="${ev.city}, ${ev.venue}"
            >
              <span>${ev.ctaText}</span>
            </button>
          </div>
        </article>
      `
      )
      .join("");
  }

  if (filterTabs) {
    filterTabs.querySelectorAll("[data-event-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterTabs.querySelectorAll(".filter-tab").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        renderEvents(btn.dataset.eventFilter);
      });
    });
  }

  renderEvents("all");
}

/**
 * Placeholder Backend Submission Hook
 * Replace the body of this function with fetch('/api/bookings', ...) when connecting a backend
 */
function submitBookingToBackend(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, referenceId: "N6-" + Math.floor(100000 + Math.random() * 900000), payload });
    }, 600);
  });
}

/**
 * Initialize Booking Modal & Form Validation (#bookingModal)
 */
function initBookingModal() {
  const bookingModal = document.getElementById("bookingModal");
  const form = document.getElementById("bookingForm");
  const submitBtn = document.getElementById("bookingSubmitBtn");
  const whatsappBtn = document.getElementById("bookingWhatsappBtn");
  const successBox = document.getElementById("bookingSuccessBox");
  const successText = document.getElementById("bookingSuccessText");

  if (!bookingModal || !form) return;

  // Open Booking Modal from any [data-open-booking] button
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-booking]");
    if (!trigger) return;
    e.preventDefault();

    // If mobile menu is open, close it first
    const mobileMenu = document.getElementById("mobileMenu");
    const menuToggle = document.getElementById("menuToggle");
    if (mobileMenu && mobileMenu.classList.contains("is-open")) {
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      if (menuToggle) {
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }

    const contextLabel = trigger.dataset.openBooking || "";
    const presetCity = trigger.dataset.bookingCity || "";
    const locationInput = document.getElementById("bookLocation");
    const messageInput = document.getElementById("bookMessage");

    if (presetCity && locationInput && !locationInput.value) {
      locationInput.value = presetCity;
    }
    if (contextLabel && messageInput && !messageInput.value) {
      messageInput.value = `Inquiry regarding: ${contextLabel}. Please share availability, technical rider, and booking terms.`;
    }

    if (typeof bookingModal.showModal === "function") {
      bookingModal.showModal();
    }
  });

  // Field Validation Helpers
  const fields = [
    { id: "bookName", validate: (v) => v.trim().length >= 2, msg: "Please enter your full name." },
    { id: "bookEmail", validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "Please enter a valid email address." },
    { id: "bookPhone", validate: (v) => v.replace(/\D/g, "").length >= 8, msg: "Please enter a valid phone / WhatsApp number." },
    { id: "bookEventType", validate: (v) => v.trim() !== "", msg: "Please select an event category." },
    { id: "bookDate", validate: (v) => v.trim() !== "", msg: "Please select a tentative event date." },
    { id: "bookLocation", validate: (v) => v.trim().length >= 2, msg: "Please enter the event city or venue." },
    { id: "bookAudience", validate: (v) => v.trim() !== "", msg: "Please select expected audience size." },
    { id: "bookMessage", validate: (v) => v.trim().length >= 10, msg: "Please provide a brief message (at least 10 characters)." }
  ];

  function validateField(fieldObj) {
    const input = document.getElementById(fieldObj.id);
    const errEl = document.getElementById(`err-${fieldObj.id}`);
    if (!input || !errEl) return true;

    const isValid = fieldObj.validate(input.value);
    const group = input.closest(".form-group");
    if (!isValid) {
      if (group) group.classList.add("has-error");
      errEl.textContent = fieldObj.msg;
    } else {
      if (group) group.classList.remove("has-error");
      errEl.textContent = "";
    }
    return isValid;
  }

  fields.forEach((f) => {
    const input = document.getElementById(f.id);
    if (input) {
      input.addEventListener("input", () => validateField(f));
      input.addEventListener("change", () => validateField(f));
    }
  });

  // Form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let allValid = true;
    fields.forEach((f) => {
      if (!validateField(f)) allValid = false;
    });

    if (!allValid) return;

    const payload = {
      fullName: document.getElementById("bookName").value.trim(),
      email: document.getElementById("bookEmail").value.trim(),
      phone: document.getElementById("bookPhone").value.trim(),
      eventType: document.getElementById("bookEventType").value,
      eventDate: document.getElementById("bookDate").value,
      location: document.getElementById("bookLocation").value.trim(),
      audience: document.getElementById("bookAudience").value,
      message: document.getElementById("bookMessage").value.trim()
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>SENDING REQUEST...</span>";
    }

    const result = await submitBookingToBackend(payload);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>SEND BOOKING REQUEST</span>";
    }

    if (result.ok && successBox) {
      successBox.hidden = false;
      if (successText) {
        successText.textContent = `Reference #${result.referenceId} confirmed for ${payload.fullName} (${payload.eventType} in ${payload.location}). Our management team will contact you at ${payload.email}.`;
      }
      form.reset();
    }
  });

  // Contact via WhatsApp Button inside Booking Modal
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      const name = document.getElementById("bookName")?.value.trim() || "Prospective Client";
      const eventType = document.getElementById("bookEventType")?.value || "Live Performance";
      const date = document.getElementById("bookDate")?.value || "Upcoming Date";
      const location = document.getElementById("bookLocation")?.value.trim() || "TBD Venue";
      const text = encodeURIComponent(
        `Hello MAINAKER DOLBOL Booking Desk, I am ${name}. I would like to inquire about booking the band for a ${eventType} on ${date} at ${location}.`
      );
      // REPLACE WITH REAL WHATSAPP NUMBER AT TOP OF FILE
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initConcertsSection();
  initBookingModal();
});

