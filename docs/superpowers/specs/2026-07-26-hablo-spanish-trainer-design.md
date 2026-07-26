# Hablo — Spanish Phrase Trainer (Design Spec)

**Date:** 2026-07-26
**Owner:** Andy Hoberman
**Status:** Approved design, pre-implementation

## What this is

A single-purpose, mobile-first web app for learning the ~500 most useful
conversational Spanish phrases via spaced-repetition flashcards. Modeled on the
Rebuild knee app's architecture: static files, no build step, no backend,
GitHub Pages, used on Andy's iPhone as a home-screen app.

**Core loop:** card shows English → Andy says the Spanish out loud →
tap "Show Spanish" → Spanish text revealed + spoken aloud by the device →
Andy self-grades "Got it" / "Missed it" → spaced repetition schedules the
next appearance.

## Decisions made (with Andy, 2026-07-26)

1. **Direction:** English shown first; user produces Spanish from memory
   (production training, not recognition).
2. **Scheduling:** Spaced repetition (Leitner-style), not static decks or
   random shuffle.
3. **Library size:** ~500 phrases at launch. Curated, frequency/usefulness
   ordered. Extensible later.
4. **Grading:** Self-graded. No microphone / speech recognition in v1.
5. **Dialect:** Latin American Spanish (ustedes, LatAm vocabulary), voice
   preference es-MX.
6. **Audio:** Browser speechSynthesis (device's built-in Spanish voice).
   No pre-generated audio files, no TTS API. Can be upgraded later without
   touching the rest of the app.
7. **Name:** Hablo. Repo `ahoberman/hablo`, live at
   `https://ahoberman.github.io/hablo/`.

## Architecture

- **Files:**
  - `index.html` — the entire app: HTML, CSS, vanilla JS. No dependencies
    beyond Google Fonts (match Rebuild's font pairing or similar).
  - `phrases.js` — the phrase library as one JS array literal
    (`window.PHRASES = [...]`). Content-only; adding phrases never touches
    app logic. Loaded via `<script src>` before the app script.
  - `icon.png` — 180×180 apple-touch-icon.
- **Hosting:** GitHub Pages from `main` branch root. Deploy = commit to main.
  Repo stays public, static-only. No backend, no accounts, no analytics.
- **Storage:** localStorage via the same storage-shim pattern as Rebuild
  (`window.storage` with `get/set/delete` returning `{key, value}`), key
  prefix `hablo:`, single JSON state blob under key `srs-v1`.
  Never re-key or wipe storage without a migration.
- **Directory:** `/Users/andyhoberman/Documents/hablo` (own git repo).

## Phrase data model

Each entry in `phrases.js`:

```js
{ id: "p001",            // stable forever — SRS state is keyed on it
  es: "¿Dónde está el baño?",
  en: "Where is the bathroom?",
  cat: "getting-around", // category slug
  note: "" }             // optional usage note, e.g. "informal — friends only"
```

Rules:

- Array order = frequency/usefulness order = the order phrases unlock as
  "new cards." Basics first, conversational glue later.
- ids are never reused or renumbered once shipped (SRS state depends on them).
- Latin American vocabulary and grammar throughout; no vosotros forms.
- Accented characters and inverted punctuation (¿ ¡) are required — the es
  string is what gets spoken and displayed.

Categories (~target counts, totaling ~500): greetings & basics, courtesy &
politeness, small talk & about yourself, question words & connectors, getting
around & directions, food & restaurants, money & shopping, time & plans,
opinions & reactions, feelings & states, emergencies & help, misc daily life.
Exact counts flex during curation; connectors/opinions get generous coverage
because they are what makes speech conversational.

## Learning engine (SRS)

Leitner-style levels with fixed intervals:

| Level | Meaning     | Next review after "Got it" |
|-------|-------------|----------------------------|
| 0     | New (unseen)| —                          |
| 1     | Learning    | 1 day                      |
| 2     |             | 3 days                     |
| 3     |             | 7 days                     |
| 4     |             | 14 days                    |
| 5     |             | 30 days                    |
| 6     | Mastered    | 90 days (stays at 6)       |

- **Got it:** level +1 (max 6), due = today + new level's interval.
- **Missed it:** level = 1, due = tomorrow. Also recycles within the current
  session: a missed card re-appears later in the same session until answered
  "Got it" once (that same-session "Got it" does not advance it beyond the
  level-1 reset — it just clears it from the session).
- **Daily session:** all cards with due ≤ today (oldest due first), then
  `newPerDay` new cards (default 10, setting: 5/10/15/20). New cards enter at
  level 1, due tomorrow, after their first appearance.
- **Dates:** local-time YYYY-MM-DD strings. Day boundary = local midnight.
- **Missed days:** due cards accumulate and all appear next session. Nothing
  is ever dropped.

Per-phrase state: `{ lvl, due, seen, misses }` (level, next-due date, times
seen, total misses). App-level state: `{ v: 1, cards: {id: state},
newPerDay, streak: {count, lastDay}, log: {"YYYY-MM-DD": {rev, new}} }`.
The `log` powers the 7-day activity chart; `streak` increments on any day
with ≥1 graded card (review or new — any day you used the app counts).

## Screens

Three tabs (bottom nav, Rebuild-style):

### 1. Today (default)
- Session card: category chip + large English text. Button: **Show Spanish**.
- On reveal: Spanish text (large), usage note if present, audio auto-plays.
  Buttons: 🔊 replay, 🐢 slow replay, then **Missed it** / **Got it**.
- Session progress bar ("12 of 27").
- Empty state / wrap-up: reviews done, new learned, current streak, and a
  "Practice 10 random known phrases" button for extra reps (extra reps do
  not change SRS state).

### 2. Library
- All phrases grouped by category, search box (matches es/en).
- Each row: es + en, level shown as dots (0–6), tap row to hear audio.
- Doubles as a lookup phrasebook ("how do I say…").

### 3. Progress
- Streak, counts: learning (lvl 1–5), mastered (lvl 6), not yet seen.
- 7-day activity bar chart (reviews per day, from `log`).
- Settings: new-cards-per-day picker.
- Backup: export state as JSON file; restore: import JSON (same pattern as
  Rebuild's Progress view).

## Audio (speechSynthesis)

- Voice selection at startup (and on `voiceschanged`): first match wins —
  `es-MX` (prefer names containing "Paulina"), then `es-US`, then any
  `es-*`. Cache the chosen voice object.
- Speak the `es` string: rate 0.9 (normal), 0.6 (🐢 slow), lang set from the
  chosen voice.
- iOS constraints handled: first utterance must follow a user gesture (reveal
  is a tap — satisfied); voices load async (listen for `voiceschanged`);
  `speechSynthesis.cancel()` before each new utterance to avoid queue pileup.
- **No Spanish voice available:** app fully works (visual flashcards); a
  small dismissible notice on Today explains audio is unavailable on this
  device/browser.

## Error handling & edge cases

- Storage read fails / empty → fresh state, never crash.
- State blob carries `v: 1`; any future schema change ships with an explicit
  migration (Rebuild rule: never wipe or re-key user state).
- Import validates shape (`v`, `cards`) before replacing state, and confirms
  with the user.
- Unknown ids in state (phrase removed from library) are ignored, not deleted
  — protects against a bad phrases.js edit.
- localStorage quota is a non-issue (state ≪ 100KB), but writes are wrapped
  in try/catch with a visible failure notice rather than silent loss.

## Testing

- Local dev: add a "hablo" entry to `~/Documents/Claude/.claude/launch.json`
  (python http.server, distinct port) — same workflow as Rebuild.
- Pre-deploy verification in the browser pane: full session flow (reveal,
  grade, recycle-on-miss, session wrap-up), SRS date math (simulated by
  manipulating stored dates), library search, export/import round-trip,
  speech on desktop (Chrome ships Spanish voices).
- Post-deploy: Andy confirms voice quality and home-screen behavior on his
  iPhone. Voice quality is the one thing that can only truly be judged on
  device.

## Out of scope for v1 (explicitly deferred)

- Microphone / speech-recognition grading.
- Pre-generated premium TTS audio (upgrade path exists: swap the speak()
  internals for `<audio>` files; nothing else changes).
- Spanish→English (recognition) mode.
- PWA/offline caching, multi-user, sync across devices.
