import { removeColorClasses, hexToString } from "./colorMap.js";

let currentIndex = 0;
let showingQuestion = true;

/**
 * Renders the practice carousel for a given deck.
 * Handles:
 * - Card flipping
 * - Navigation between cards
 * - Color assignment
 * - Title + progress updates
 * - Back button behavior
 *
 * @param {Object} deck - The deck object containing cards.
 * @returns {void}
 */
export function renderCarouselView(deck) {
  const page = document.querySelector(".page");
  const homeSection = document.querySelector("#home");
  const carouselSection = document.querySelector("#carousel");
  const notFoundSection = document.querySelector("#not-found");
  const mainContent = document.querySelector(".page__main-content");

  const titleEl = carouselSection.querySelector(".carousel__title");

  const cardEl = carouselSection.querySelector(".carousel__card");
  const frontTextEl = carouselSection.querySelector(".carousel__card-text");
  const backTextEl = carouselSection.querySelector(".carousel__card-text--back");

  // Show carousel
  carouselSection.style.display = "flex";

  // Disable mobile bar
  page.classList.add("page_no-mobile-bar");
  page.classList.add("page_location_carousel");

  // Buttons
  const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
  const backBtn = carouselSection.querySelector(".carousel__back-btn");

  /**
   * Handles clicking the "Back" button.
   * Returns user to the home page.
   *
   * @returns {void}
   */
  backBtn.onclick = () => {
    page.classList.remove("page_no-mobile-bar");
    page.classList.remove("page_location_carousel");
    window.location.hash = "#home";
  };

  // Hide other sections
  homeSection.style.display = "none";
  notFoundSection.style.display = "none";

  mainContent.classList.add("page__main-content_type_carousel");

  /**
   * Builds the title string for the carousel.
   *
   * @param {Object} deckObj - The deck object.
   * @param {number} index - The current card index.
   * @returns {string} The formatted title string.
   */
  function getCarouselTitleString(deckObj, index) {
    return `${deckObj.name} · ${index + 1}/${deckObj.cards.length}`;
  }

  /**
   * Updates the carousel display to show the current card.
   * Handles:
   * - Question/answer text
   * - Flip state
   * - Title + progress
   * - Color class
   * - Button enable/disable
   *
   * @returns {void}
   */
  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    // Update text
    frontTextEl.textContent = currentCard.question;
    backTextEl.textContent = currentCard.answer;

    // Flip state
    cardEl.classList.toggle("carousel__card--flipped", !showingQuestion);

    // Title
    titleEl.textContent = getCarouselTitleString(deck, currentIndex);

    // Progress
    const progressEl = carouselSection.querySelector(".carousel__progress");
    progressEl.textContent = `Card ${currentIndex + 1} of ${deck.cards.length}`;

    // Color
    removeColorClasses(cardEl);
    const colorName = hexToString(deck.color);
    cardEl.classList.add(`carousel__card_color_${colorName}`);

    // Button states
    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex === deck.cards.length - 1;

    leftBtn.classList.toggle("carousel__btn_disabled", leftBtn.disabled);
    rightBtn.classList.toggle("carousel__btn_disabled", rightBtn.disabled);
  }

  /**
   * Handles clicking the left navigation button.
   *
   * @returns {void}
   */
  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      showingQuestion = true;
      updateDisplay();
    }
  };

  /**
   * Handles clicking the right navigation button.
   *
   * @returns {void}
   */
  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex += 1;
      showingQuestion = true;
      updateDisplay();
    }
  };

  /**
   * Handles clicking the flip button.
   * Uses a timeout to ensure the button exists in DOM.
   *
   * @returns {void}
   */
  setTimeout(() => {
    const flipBtn = document.querySelector(".carousel__btn_type_flip");

    flipBtn.onclick = () => {
      showingQuestion = !showingQuestion;
      updateDisplay();
    };
  }, 0);

  // Initial state
  currentIndex = 0;
  showingQuestion = true;
  updateDisplay();
}
