## ADDED Requirements

### Requirement: Chapter and Topic Filtering
The flashcard module SHALL allow users to filter cards by specific OEC chapters, core domains, or review all cards together.

#### Scenario: User filters by specific chapter
- **WHEN** user selects "Domain 2: Trauma & Shock" from the chapter filter dropdown
- **THEN** the deck updates to display only flashcards tagged with trauma and shock topics, resetting the active card index to 1

#### Scenario: User selects all chapters
- **WHEN** user selects "All Chapters"
- **THEN** the deck aggregates all available flashcards across all chapters into a randomized or sequential study queue

### Requirement: Interactive Card Flipping and State
The flashcard module SHALL display a front (question/prompt) and back (answer/protocol explanation) with an animated flip state responsive to touch or click.

#### Scenario: Flipping a flashcard
- **WHEN** user taps or clicks on the flashcard body or the flip button
- **THEN** the card performs a 3D flip animation to reveal the reverse side without losing current deck position

### Requirement: Self-Assessment and Mastery Tracking
The flashcard module SHALL provide "Need Review" and "Mastered" actions that update client-side mastery statistics in localStorage.

#### Scenario: Marking a card as mastered
- **WHEN** user marks a card as "Mastered"
- **THEN** the card is recorded as mastered in localStorage, removed from the current review session queue, and mastery counters increment

#### Scenario: Marking a card for review
- **WHEN** user marks a card as "Need Review"
- **THEN** the card remains in the active review pool and is queued to reappear before the end of the session
