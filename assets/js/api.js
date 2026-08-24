const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

const headers = {
  "Content-Type": "application/json",
  Authorization: "01a0084e-5bff-7295-9a25-65ce2eb97304",
};

/**
 * Processes a fetch() response and returns JSON if successful,
 * or a rejected Promise containing an error message.
 *
 * @param {Response} res
 * @returns {Promise<Object>}
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks.
 *
 * @returns {Promise<Array>}
 */
export function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

/**
 * Deletes a deck by ID.
 *
 * @param {string} deckId
 * @returns {Promise<Object>}
 */
export function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

/**
 * Creates a new deck.
 *
 * @param {{name: string, color: string, cards: Array}} deckData
 * @returns {Promise<Object>}
 */
export function createDeck(deckData) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify(deckData),
  }).then(processResponse);
}

/**
 * Creates a new card inside a deck.
 *
 * @param {string} deckId
 * @param {{question: string, answer: string}} cardData
 * @returns {Promise<Object>}
 */
export function createCard(deckId, cardData) {
  return fetch(`${baseUrl}/decks/${deckId}/cards`, {
    method: "POST",
    headers,
    body: JSON.stringify(cardData),
  }).then(processResponse);
}

/**
 * Deletes a card by ID.
 *
 * @param {string} cardId
 * @returns {Promise<Object>}
 */
export function deleteCard(cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}
