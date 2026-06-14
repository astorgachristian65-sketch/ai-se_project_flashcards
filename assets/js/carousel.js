import { removeColorClasses, hexToString } from "./colorMap.js";

let currentIndex = 0;
let showingQuestion = true;

export function renderCarouselView(deck) {
  const homeSection = document.querySelector("#home");
  const carouselSection = document.querySelector("#carousel");
  const notFoundSection = document.querySelector("#not-found");
  const mainContent = document.querySelector(".page__main-content");

  const titleEl = carouselSection.querySelector(".carousel__title");
  const cardEl = carouselSection.querySelector(".card__carousel");

  const frontTextEl = carouselSection.querySelector(".card__carousel-text");
  const backTextEl = carouselSection.querySelector(".card__carousel-text--back");

  carouselSection.style.display = "flex";

  document.body.classList.add("page_no-mobile-bar");
  document.body.classList.add("page_location_carousel");

  const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
  const backBtn = carouselSection.querySelector(".carousel__back-btn");
  backBtn.onclick = () => {
  document.body.classList.remove("page_no-mobile-bar");
  document.body.classList.remove("page_location_carousel");
  window.location.hash = "#home";
};

  
  homeSection.style.display = "none";
  notFoundSection.style.display = "none";
  
  mainContent.classList.add("page__main-content_type_carousel");
  
  function getCarouselTitleString(deck, index) {
    return `${deck.name} · ${index + 1}/${deck.cards.length}`;
  }

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    
    frontTextEl.textContent = currentCard.question;
    backTextEl.textContent = currentCard.answer;
    
    
    cardEl.classList.toggle("card__carousel--flipped", !showingQuestion);
    
    
    titleEl.textContent = getCarouselTitleString(deck, currentIndex);

    const progressEl = carouselSection.querySelector(".carousel__progress");
  progressEl.textContent = `Card ${currentIndex + 1} of ${deck.cards.length}`;
  
    
    removeColorClasses(cardEl);
    const colorName = hexToString(deck.color);
    cardEl.classList.add(`card__carousel_color_${colorName}`);
    
    
    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex === deck.cards.length - 1;
    
    leftBtn.classList.toggle("carousel__btn_disabled", leftBtn.disabled);
    rightBtn.classList.toggle("carousel__btn_disabled", rightBtn.disabled);
  }

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      showingQuestion = true;
      updateDisplay();
    }
  };
  
  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex += 1;
      showingQuestion = true;
      updateDisplay();
    }
  };
  
  setTimeout(() => {
  const flipBtn = document.querySelector(".carousel__btn_type_flip");

  flipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };
}, 0);

  currentIndex = 0;
  showingQuestion = true;
  updateDisplay();
}
