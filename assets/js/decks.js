/**
 * Local in‑memory store of all fetched decks.
 * Populated once on initial load via getDecks().
 *
 * @type {Array<Object>}
 */
export const fetchedDecks = [];

/**
 * Finds and returns a deck by its ID.
 *
 * @param {string} deckId - The ID of the deck to retrieve.
 * @returns {Object|undefined} The matching deck or undefined if not found.
 */
export function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}
