import { fetchedDecks } from "./decks.js";
import { createDeck } from "./api.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

const newDeckForm = document.querySelector("#new-deck-form");
const submitBtn = newDeckForm.querySelector(".form__submit-btn");
const textarea = newDeckForm.querySelector("textarea");

const errorModal = document.querySelector("#error-modal");
const errorMessageEl = errorModal.querySelector(".modal__message");
const errorCloseBtn = errorModal.querySelector(".modal__close");

errorCloseBtn.addEventListener("click", () => {
  errorModal.classList.remove("modal_visible");
  errorMessageEl.textContent = "";
});

/**
 * Normalizes a color string into a lowercase hex value.
 *
 * @param {string} color - The user-provided color string.
 * @returns {string} A normalized hex color beginning with "#".
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return `#${hex.toLowerCase()}`;
}

/**
 * Validates a deck name ensuring it is a string between 2 and 80 characters.
 *
 * @param {string} name - The deck name to validate.
 * @returns {string|null} The validated name or null if invalid.
 */
function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Safely parses a JSON string.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {Object|null} Parsed JSON or null if invalid.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Displays an error modal with a message.
 *
 * @param {string} message - The error message to show.
 * @returns {void}
 */
function showError(message) {
  errorMessageEl.textContent = message;
  errorModal.classList.add("modal_visible");
}

/**
 * Enables the submit button for the new deck form.
 *
 * @returns {void}
 */
export function disableSubmitBtn() {
  submitBtn.disabled = false;
}

/**
 * Handles the new deck form submission:
 * - Validates JSON input
 * - Validates deck name
 * - Validates card array
 * - Validates color consistency
 * - Sends POST request to create deck
 * - Updates local state
 * - Navigates to the new deck
 *
 * @param {Event} e - The form submission event.
 * @returns {Promise<void>}
 */
async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData.entries());

  const jsonData = parseJSON(values.deckDescription);
  if (!jsonData) {
    showError("Your JSON is invalid. Please fix it and try again.");
    return;
  }

  const validName = validateName(jsonData.name);
  if (!validName) {
    showError("The deck name must be a string between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError("The 'cards' field must be an array.");
    return;
  }

  const selectedColor = normalizeColor(values.deckColor);

  if (typeof jsonData.color === "string") {
    const jsonColor = normalizeColor(jsonData.color);

    if (jsonColor !== selectedColor) {
      showError(
        `Color mismatch: JSON color (${jsonColor}) does not match selected color (${selectedColor}).`
      );
      return;
    }
  }

  const newDeckData = {
    name: validName,
    color: selectedColor,
    cards: jsonData.cards,
  };

  const createdDeck = await createDeck(newDeckData);

  fetchedDecks.push({
  ...createdDeck,
  cards: Array.isArray(createdDeck.cards) && createdDeck.cards.length > 0
    ? createdDeck.cards
    : newDeckData.cards
});


  window.location.hash = `#/deck/${createdDeck._id}`;
}

newDeckForm.addEventListener("submit", handleSubmit);

export { showError };
