My Flashcard Project was created using HTML, CSS and Javascript. It gives people the ability to create new decks, add cards, practice using a carousel interface and navigate with hash-based routing.

🔹 Open Deck View
Each deck now has its own dedicated view where users can:

See all cards inside the deck

Add new cards

Delete existing cards

Navigate back to the home view

This view uses the same responsive card layout as the home page.

Has a good responsiveness

Practice Mode (Carousel)
A fully interactive study mode:

Flip cards to reveal answers

Navigate with Next and Previous buttons

Progress indicator (Card X of Y)

Deck title with card count

Color‑themed card backgrounds

Back button returns to Home

Smooth flip animation using transform: rotateY()

Fully responsive layout for mobile and desktop

Routing
The app uses hash‑based routing:

#/home — Home View

#/deck/:id — Deck View

#/deck/:id/practice — Practice Mode

#/not-found — 404 fallback

Routing is handled manually without frameworks.

Templates
The app uses <template> elements for:

Deck cards

Flashcards

This keeps the DOM clean and avoids repetitive HTML.