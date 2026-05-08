import { renderCarouselView } from "./carousel.js";
import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colorMap.js";

const deckTemplate = document.querySelector('#deck-template');
const deckList = document.querySelector('.decks__list');

const mainContent = document.querySelector(".page__main-content");
const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const notFoundSection = document.querySelector("#not-found");

function createDeckEl(item) {
  const clone = deckTemplate.content.querySelector('.deck').cloneNode(true);

  const deleteBtn = clone.querySelector('.deck__delete-btn');
  const linkEl = clone.querySelector('.deck__link');

  linkEl.href = `#carousel/${item.id}`;
  clone.querySelector('.deck__title').textContent = item.name;
  clone.querySelector('.deck__count').textContent = `${item.cards.length} Cards`;

  const color = hexToString(item.color);
  clone.classList.add(`deck_color_${color}`);

  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    clone.remove();
  });

  return clone;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckList.prepend(deckEl);
}

decks.forEach(renderDeckEl);

function renderHomeView() {
  homeSection.style.display = "block";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "none";
}

function renderNotFoundView() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  notFoundSection.style.display = "flex";
}

function router() {
  const hash = window.location.hash.slice(1); 

  if (hash === "home" || hash === "") {
  renderHomeView();
  return;
}

if (hash.startsWith("carousel/")) {
  const id = hash.split("/")[1];
  const deck = getDeckByID(id);

  if (deck) {
    homeSection.style.display = "none";
    notFoundSection.style.display = "none";
    carouselSection.style.display = "flex";
    mainContent.classList.add("page__main-content_type_carousel");
    renderCarouselView(deck);
  } else {
    renderNotFoundView();
  }
}

    return;
  }

  renderNotFoundView();


window.addEventListener("hashchange", router);

router();