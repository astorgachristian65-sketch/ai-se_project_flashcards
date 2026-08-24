import { fetchedDecks, getDeckByID } from "./decks.js";
import { showError, disableSubmitBtn } from "./new-deck-view.js";
import { renderCarouselView } from "./carousel.js";
import { getDecks, createDeck, deleteDeck, createCard, deleteCard } from "./api.js";
import { hexToString } from "./colorMap.js";

const page = document.querySelector(".page");

let currentDeck = null;

// Templates
const deckTemplate = document.querySelector("#deck-template");
const cardTemplate = document.querySelector("#card-template");

// Sections
const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");
const aboutSection = document.querySelector("#about");
const newDeckViewSection = document.querySelector("#new-deck-view");

// Lists
const homeList = homeSection.querySelector(".home__list");
const deckViewList = deckViewSection.querySelector(".deck-view__list");

// Buttons
const practiceBtns = deckViewSection.querySelectorAll(".deck-view__practice-btn");
const newDeckButtons = document.querySelectorAll(
  ".home__new-deck-btn-desktop, .mobile-bar__new-deck-btn"
);

const newDeckForm = document.getElementById("new-deck-form");

/**
 * Shows one section and hides all others.
 *
 * @param {string} sectionId - The ID of the section to show.
 * @returns {void}
 */
function showSection(sectionId) {
  const sections = {
    home: homeSection,
    "deck-view": deckViewSection,
    carousel: carouselSection,
    about: aboutSection,
    "new-deck-view": newDeckViewSection,
    "not-found": notFoundSection,
  };

  Object.entries(sections).forEach(([id, el]) => {
    el.style.display = id === sectionId ? "block" : "none";
  });
}

/**
 * Creates a deck card element for the home gallery.
 *
 * @param {Object} deck - The deck object to render.
 * @returns {DocumentFragment} A cloned template containing the deck card.
 */
function createDeckEl(deck) {
  const clone = deckTemplate.content.cloneNode(true);
  const cardEl = clone.querySelector(".card");

  clone.querySelector(".card__title").textContent = deck.name;
  clone.querySelector(".card__count").textContent = `${deck.cards.length} cards`;

  const color = hexToString(deck.color);
  cardEl.classList.add(`card_color_${color}`);

  /**
   * Handles deleting a deck.
   *
   * @param {MouseEvent} evt
   * @returns {void}
   */
  clone.querySelector(".card__btn_type_delete").addEventListener("click", (evt) => {
    evt.stopPropagation();

    deleteDeck(deck._id)
      .then(() => {
        const index = fetchedDecks.findIndex((d) => d._id === deck._id);
        if (index !== -1) {
          fetchedDecks.splice(index, 1);
        }
        clone.remove();
      })
      .catch(() => {
        showError("Failed to delete deck.");
      });
  });

  /**
   * Handles clicking a deck card to open it.
   *
   * @returns {void}
   */
  cardEl.addEventListener("click", () => {
    currentDeck = deck;
    window.location.hash = `#/deck/${deck._id}`;
  });

  return clone;
}

/**
 * Renders the home view.
 *
 * @returns {void}
 */
function renderHomeView() {
  showSection("home");
}

/**
 * Renders the deck view with all cards.
 *
 * @param {Object} deck - The deck object to display.
 * @returns {Promise<void>}
 */
export async function renderDeckView(deck) {
  showSection("deck-view");

  deckViewSection.querySelector(".deck-view__title").textContent = deck.name;
  deckViewList.innerHTML = "";

  deck.cards.forEach((card) => {
    const clone = cardTemplate.content.cloneNode(true);
    const cardEl = clone.querySelector(".card");

    clone.querySelector(".card-front .card__title_front").textContent = card.question;
    clone.querySelector(".card-back .card__answer").textContent = card.answer;

    const color = hexToString(deck.color);
    cardEl.classList.add(`card_color_${color}`);

    /**
     * Handles flipping a card.
     *
     * @returns {void}
     */
    clone.querySelector(".card__btn_type_flip").addEventListener("click", () => {
      cardEl.classList.toggle("is_flipped");
    });

    /**
     * Handles deleting a card.
     *
     * @returns {Promise<void>}
     */
    clone.querySelector(".card__btn_type_delete").addEventListener("click", async () => {
      await deleteCard(card._id);
      cardEl.remove();
    });

    deckViewList.appendChild(clone);
  });
}

/**
 * Router — handles navigation based on hash.
 *
 * @returns {Promise<void>}
 */
async function router() {
  let hash = window.location.hash
    .replace(/^#\//, "")
    .replace(/^#/, "")
    .toLowerCase();

  // Home
  if (hash === "" || hash === "home") {
    page.classList.remove("page_no-mobile-bar");
    renderHomeView();

    homeList.innerHTML = "";
    fetchedDecks.forEach((deck) => homeList.appendChild(createDeckEl(deck)));
    return;
  }

  // About
  if (hash === "about") {
    page.classList.remove("page_no-mobile-bar");
    showSection("about");
    return;
  }

  // New deck
  if (hash === "new-deck") {
    page.classList.remove("page_no-mobile-bar");
    showSection("new-deck-view");
    disableSubmitBtn();
    return;
  }

  // Deck routes
  if (hash.startsWith("deck/")) {
    const parts = hash.split("/");
    const deckId = parts[1];

    if (!deckId) {
      showSection("not-found");
      return;
    }

    currentDeck = getDeckByID(deckId);

    if (!currentDeck) {
      page.classList.add("page_no-mobile-bar");
      showSection("not-found");
      return;
    }

    // Practice mode
    if (parts[2] === "practice") {
      page.classList.add("page_no-mobile-bar");
      showSection("carousel");
      renderCarouselView(currentDeck);
      return;
    }

    // Invalid route
    if (parts.length > 3) {
      showSection("not-found");
      return;
    }

    // Deck view
    page.classList.remove("page_no-mobile-bar");
    renderDeckView(currentDeck);
    return;
  }

  // Not found
  if (hash === "not-found") {
    page.classList.add("page_no-mobile-bar");
    showSection("not-found");
    return;
  }

  // Default fallback
  page.classList.add("page_no-mobile-bar");
  showSection("not-found");
}

// Practice buttons
practiceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!currentDeck) return;
    window.location.hash = `#/deck/${currentDeck._id}/practice`;
  });
});

// New deck buttons (desktop + mobile)
newDeckButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.hash = "#/new-deck";
  });
});

/**
 * Initial load:
 * - Fetch decks
 * - Populate home gallery
 * - Run router
 */
document.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
      
    })
    .catch(() => {
      showError("Can't fetch decks");
    })
    .finally(() => {
      router();
    });
});

window.addEventListener("hashchange", router);
router();
