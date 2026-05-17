import { renderCarouselView } from "./carousel.js";
import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colorMap.js";


let currentDeck = null;

const deckTemplate = document.querySelector("#deck-template");
const cardTemplate = document.querySelector("#card-template");

const homeSection = document.querySelector("#home");
const deckViewSection = document.querySelector("#deck-view");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");

const homeList = homeSection.querySelector(".gallery__list");
const deckViewList = deckViewSection.querySelector(".gallery__list");

const practiceBtn = deckViewSection.querySelector(".gallery__new-card-btn");

function showSection(sectionId) {
  const sections = {
    home: homeSection,
    "deck-view": deckViewSection,
    carousel: carouselSection,
    "not-found": notFoundSection,
  };

  Object.entries(sections).forEach(([id, el]) => {
    el.style.display = id === sectionId ? "block" : "none";
  });
}

function createDeckEl(deck) {
  const clone = deckTemplate.content.cloneNode(true);
  const cardEl = clone.querySelector(".card");

  clone.querySelector(".card__title").textContent = deck.name;
  clone.querySelector(".card__count").textContent = `${deck.cards.length} cards`;

  const color = hexToString(deck.color);
  cardEl.classList.add(`card_color_${color}`);

  clone.querySelector(".card__delete-btn").addEventListener("click", (evt) => {
    evt.stopPropagation();
    cardEl.remove();
  });

  cardEl.addEventListener("click", () => {
    currentDeck = deck;
    window.location.hash = `#/deck/${deck.id}`;
  });

  return clone;
}

function renderHomeView() {
  showSection("home");

  homeList.innerHTML = "";
  decks.forEach((deck) => {
    homeList.appendChild(createDeckEl(deck));
  });
}

export function renderDeckView(deck) {
  showSection("deck-view");

  deckViewSection.querySelector(".gallery__title").textContent = deck.name;

  deckViewList.innerHTML = "";

  deck.cards.forEach((card) => {
    const clone = cardTemplate.content.cloneNode(true);
    const cardEl = clone.querySelector(".card");

    clone.querySelector(".card__title").textContent = card.question;

    clone.querySelector(".card__flip-btn").addEventListener("click", () => {
      cardEl.classList.toggle("card_flipped");
    });

    clone.querySelector(".card__delete-btn").addEventListener("click", () => {
      deck.cards = deck.cards.filter((c) => c.id !== card.id);
      renderDeckView(deck);
    });

    deckViewList.appendChild(clone);
  });
}

practiceBtn.addEventListener("click", () => {
  if (!currentDeck) return;
  window.location.hash = `#/deck/${currentDeck.id}/practice`;
});

function router() {
  const hash = window.location.hash.replace("#/", "");

  if (hash === "" || hash === "home") {
    renderHomeView();
    return;
  }

  if (hash.startsWith("deck/")) {
    const parts = hash.split("/");
    const deckId = parts[1];

    currentDeck = getDeckByID(deckId);

    if (!currentDeck) {
      showSection("not-found");
      return;
    }

    if (parts[2] === "practice") {
      showSection("carousel");
      renderCarouselView(currentDeck);
      return;
    }

    renderDeckView(currentDeck);
    return;
  }

  if (hash.startsWith("carousel/")) {
    const id = hash.split("/")[1];
    const deck = getDeckByID(id);

    if (deck) {
      currentDeck = deck;
      showSection("carousel");
      renderCarouselView(deck);
    } else {
      showSection("not-found");
    }
    return;
  }

  showSection("not-found");
}

window.addEventListener("hashchange", router);

router();
