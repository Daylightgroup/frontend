/* =========================================================
   NILE GLOBAL REFINERY — MAIN FRONTEND SCRIPT
   Production Ready for:
   - Vercel Frontend
   - Render Backend
========================================================= */

/* =========================
   CONFIGURATION
========================= */

// Replace with your real Render backend URL
const API_BASE_URL = "https://your-backend-name.onrender.com";

/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
  const nav = document.querySelector(".nav-links");

  if (nav) {
    nav.classList.toggle("active");
  }
}

/* =========================
   CONTACT FLOATING MENU
========================= */

function toggleContactMenu() {
  const menu = document.getElementById("contactMenu");

  if (menu) {
    menu.classList.toggle("active");
  }
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

function initRevealAnimations() {

  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach((reveal) => {
    observer.observe(reveal);
  });

}

/* =========================
   LIVE CLOCK (GMT+3)
========================= */

function updateClock() {

  const now = new Date();

  // GMT+3
  const gmt3 = new Date(
    now.getTime() + (3 * 60 * 60 * 1000)
  );

  const day = String(gmt3.getUTCDate()).padStart(2, "0");

  const month = String(
    gmt3.getUTCMonth() + 1
  ).padStart(2, "0");

  const year = gmt3.getUTCFullYear();

  const hours = String(
    gmt3.getUTCHours()
  ).padStart(2, "0");

  const minutes = String(
    gmt3.getUTCMinutes()
  ).padStart(2, "0");

  const seconds = String(
    gmt3.getUTCSeconds()
  ).padStart(2, "0");

  const timeEl = document.getElementById("update-time");

  if (timeEl) {

    timeEl.textContent =
      `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  }

}

/* =========================
   NUMBER ANIMATION
========================= */

function animateValue(
  id,
  start,
  end,
  duration = 1000
) {

  const el = document.getElementById(id);

  if (!el) return;

  const range = end - start;

  let startTime = null;

  function step(timestamp) {

    if (!startTime) {
      startTime = timestamp;
    }

    const progress = timestamp - startTime;

    const percent = Math.min(
      progress / duration,
      1
    );

    const value = start + range * percent;

    el.textContent = `$${value.toFixed(2)}`;

    if (percent < 1) {
      requestAnimationFrame(step);
    }

  }

  requestAnimationFrame(step);

}

/* =========================
   MARKET VARIABLES
========================= */

let previousGold = null;
let previousOil = null;

/* =========================
   GOLD PRICE FETCH
========================= */

async function fetchGold() {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/gold`
    );

    if (!response.ok) {
      throw new Error("Gold API failed");
    }

    const data = await response.json();

    if (!data.price) {
      throw new Error("No gold price");
    }

    const goldPrice = Number(data.price);

    animateValue(
      "gold-price",
      previousGold || goldPrice,
      goldPrice,
      1000
    );

    updateIndicator(
      "gold-indicator",
      goldPrice,
      previousGold
    );

    previousGold = goldPrice;

    // Dashboard mirror
    const dashboardGold =
      document.getElementById("goldMarket");

    if (dashboardGold) {
      dashboardGold.textContent =
        `$${goldPrice.toFixed(2)}`;
    }

  } catch (error) {

    console.error(
      "Gold price fetch failed:",
      error
    );

    // fallback
    const fallbackPrice = 2345.00;

    animateValue(
      "gold-price",
      previousGold || fallbackPrice,
      fallbackPrice,
      1000
    );

  }

}

/* =========================
   OIL PRICE FETCH
========================= */

async function fetchOil() {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/oil`
    );

    if (!response.ok) {
      throw new Error("Oil API failed");
    }

    const data = await response.json();

    if (!data.price) {
      throw new Error("No oil price");
    }

    const oilPrice = Number(data.price);

    const oilEl =
      document.getElementById("oil-price");

    if (oilEl) {
      oilEl.textContent =
        `$${oilPrice.toFixed(2)}`;
    }

    updateIndicator(
      "oil-indicator",
      oilPrice,
      previousOil
    );

    previousOil = oilPrice;

    // Dashboard mirror
    const dashboardOil =
      document.getElementById("oilMarket");

    if (dashboardOil) {
      dashboardOil.textContent =
        `$${oilPrice.toFixed(2)}`;
    }

  } catch (error) {

    console.error(
      "Oil price fetch failed:",
      error
    );

  }

}

/* =========================
   PRICE DIRECTION INDICATOR
========================= */

function updateIndicator(
  indicatorId,
  current,
  previous
) {

  const indicator =
    document.getElementById(indicatorId);

  if (!indicator || previous === null) return;

  indicator.classList.remove(
    "up",
    "down"
  );

  if (current > previous) {

    indicator.classList.add("up");
    indicator.textContent = "▲";

  } else if (current < previous) {

    indicator.classList.add("down");
    indicator.textContent = "▼";

  } else {

    indicator.textContent = "•";

  }

}

/* =========================
   CHATBOT
========================= */

function toggleChat() {

  const chatbox =
    document.getElementById("chatbox");

  if (chatbox) {
    chatbox.classList.toggle("active");
  }

}

function handleKey(event) {

  if (event.key === "Enter") {
    sendMessage();
  }

}

function sendMessage() {

  const input =
    document.getElementById("userInput");

  const messages =
    document.getElementById("messages");

  if (!input || !messages) return;

  const text = input.value.trim();

  if (!text) return;

  const userMessage =
    document.createElement("div");

  userMessage.className = "user-message";

  userMessage.textContent = text;

  messages.appendChild(userMessage);

  // basic bot reply
  const botMessage =
    document.createElement("div");

  botMessage.className = "bot-message";

  botMessage.textContent =
    "Our trade desk will assist you shortly.";

  messages.appendChild(botMessage);

  input.value = "";

  messages.scrollTop =
    messages.scrollHeight;

}

/* =========================
   COOKIE BANNER
========================= */

function initCookies() {

  const banner =
    document.getElementById("cookie-banner");

  const accept =
    document.getElementById("accept-cookies");

  const reject =
    document.getElementById("reject-cookies");

  if (!banner || !accept || !reject) return;

  const consent =
    localStorage.getItem("cookieConsent");

  if (!consent) {
    banner.style.display = "flex";
  }

  accept.addEventListener("click", () => {

    localStorage.setItem(
      "cookieConsent",
      "accepted"
    );

    banner.style.display = "none";

  });

  reject.addEventListener("click", () => {

    localStorage.setItem(
      "cookieConsent",
      "rejected"
    );

    banner.style.display = "none";

  });

}

/* =========================
   GOOGLE TRANSLATE
========================= */

function googleTranslateElementInit() {

  if (
    typeof google !== "undefined" &&
    google.translate
  ) {

    new google.translate.TranslateElement(
      {
        pageLanguage: "en"
      },
      "google_translate_element"
    );

  }

}

/* =========================
   INITIALIZATION
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initRevealAnimations();

    updateClock();

    setInterval(updateClock, 1000);

    fetchGold();

    fetchOil();

    setInterval(fetchGold, 30000);

    setInterval(fetchOil, 30000);

    initCookies();

  }
);