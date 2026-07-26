# Hablo — Spanish Phrase Trainer

## What this is
A static, mobile-first spaced-repetition flashcard app teaching ~500
conversational Latin American Spanish phrases. Andy uses it on his iPhone as a
home-screen web app. Flow: English prompt → Andy says the Spanish out loud →
tap reveals Spanish + device TTS speaks it → self-grade Got it / Missed it.

Full behavior spec: `docs/superpowers/specs/2026-07-26-hablo-spanish-trainer-design.md`
(source of truth). Implementation plan: `docs/superpowers/plans/2026-07-26-hablo-spanish-trainer.md`.

## Architecture (no build step, no dependencies)
- `index.html` — the entire app: HTML, CSS, vanilla JS (Rebuild-app pattern).
- `phrases.js` — `window.PHRASES = [...]`; content only, never logic.
  Array order = unlock order.
- `srs.js` — pure SRS logic, dual browser (`window.SRS`) / Node module.
- `test/` — `node --test test/` (Node built-in runner, zero deps).

## Hard rules
- **Phrase ids (`p001`…) are stable forever** — never renumber, reuse, or
  reorder ids; SRS state is keyed on them. New phrases append.
- **Never wipe or re-key localStorage without a migration.** State is one JSON
  blob at key `hablo:srs-v1`: `{ v: 1, cards: {id: {lvl, due, seen, misses}},
  newPerDay, streak: {count, lastDay}, log: {"YYYY-MM-DD": {rev, new}} }`.
  Dates are local-time `YYYY-MM-DD` strings.
- Latin American Spanish only; no vosotros forms (validation test enforces).

## SRS rules
Levels 1–6, intervals 1/3/7/14/30/90 days. Got it → level+1 (cap 6);
Missed it → level 1, due tomorrow; missed cards recycle within the session
until answered Got once (first grade of the session is the one that writes
SRS state). Session = due reviews (oldest first) + `newPerDay` new (default 10).

## Deploy & dev
- GitHub: `ahoberman/hablo` (public). Live: https://ahoberman.github.io/hablo/
  GitHub Pages from main root — **deploy = commit to main** (~1 min build).
- Local dev: "hablo" entry in `~/Documents/Claude/.claude/launch.json`
  (python http.server, port 8643).
- Tests: `node --test test/` must pass before any commit touching srs.js or
  phrases.js.
