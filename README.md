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

Check out my Flashcard video https://drive.google.com/file/d/1xWEnjRJMcappztaa3XZ1sv4sLJnsrPSj/view?usp=sharing where I describe some of the challenges I faced and how I overcame them.


Flashcards App
A simple, responsive flashcards application built with vanilla JavaScript, HTML, and CSS. Users can create decks, add cards, practice using a carousel interface, and store everything persistently through a remote API.

Features
📘 Create New Decks
Users can create custom decks using a JSON‑based form.
Each deck includes:

A name

A color

An array of cards

Automatic validation for name, color, and card structure

Decks are saved to a remote database via the API.

📝 Add and View Cards
Each deck contains cards with a question and answer.
Users can:

Flip cards

Delete cards

Practice cards in a carousel view

🎠 Practice Mode (Carousel)
The practice carousel allows users to:

Flip between question/answer

Navigate left/right

Track progress

View deck color styling

⚠️ Error Handling via Modal
All validation and API errors are displayed using a custom modal:

Invalid JSON

Invalid deck name

Color mismatches

API failures (fetch errors, delete failures, etc.)

This keeps the UI clean and prevents page reloads.

🌐 Remote API Integration
The app communicates with a remote database using:

GET /v1/decks

POST /v1/decks

DELETE /v1/decks/:id

All requests include proper headers and error handling.

📚 Complete JSDoc Documentation
All named functions across the project are fully documented using JSDoc, including:

Parameter types

Return types

Clear descriptions

Inline documentation for helper functions

This makes the codebase easier to maintain and understand.

Tech Stack
HTML5

CSS3 (BEM)

JavaScript (ES Modules)

Remote REST API

Modal‑based error handling

Hash‑based routing (SPA)