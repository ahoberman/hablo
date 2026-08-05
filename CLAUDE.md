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
- `audio/` — one neural MP3 per phrase (`p001.mp3`…), Microsoft es-MX Dalia.
  Primary playback; device TTS is only the fallback (offline/missing file).
  After adding phrases: `pip install edge-tts`, then `python3 tools/gen_audio.py`
  (idempotent — only generates missing files) and commit the new MP3s.
- `test/` — `node --test` (Node built-in runner, zero deps; bare invocation,
  a `test/` path argument breaks discovery on Node 24).

## Hard rules
- **Phrase ids (`p001`…) are stable forever** — never renumber, reuse, or
  reorder ids; SRS state is keyed on them. New phrases append.
- **Never wipe or re-key localStorage without a migration.** State is one JSON
  blob at key `hablo:srs-v1`: `{ v: 1, cards: {id: {lvl, due, seen, misses}},
  newPerDay, streak: {count, lastDay}, log: {"YYYY-MM-DD": {rev, new}} }`.
  Dates are local-time `YYYY-MM-DD` strings.
- Latin American Spanish only; no vosotros forms (validation test enforces).
- **Pan-LatAm, not country-specific** (Andy's call 2026-08-05): phrases must be
  understood everywhere in Latin America. No Mexican-only, Colombian-only, etc.
  slang (no *no manches*, *qué chévere*, *órale*, *mande*). Notes must never name
  a country or offer two regional variants — give one answer. The sole exception
  is lesson reference material contrasting her Spain forms with the LatAm ones.

## SRS rules
Levels 1–6, intervals 1/3/7/14/30/90 days. Got it → level+1 (cap 6);
Missed it → level 1, due tomorrow; missed cards recycle within the session
until answered Got once (first grade of the session is the one that writes
SRS state). Session = due reviews (oldest first) + `newPerDay` new (default 10).

## Adding new teacher lessons (repeatable)
Andy's Spanish teacher sends numbered slide-deck PDFs (54–67 landed 2026-08-05;
1–53 exist somewhere, more will come). To add a batch:
1. Unzip the PDFs to a scratch dir. Group them by lesson topic (a main deck plus
   its practice/homework decks = one lesson object).
2. Extract per group: her rules, conjugation tables, example sentences, and every
   practice exercise **with worked answers**. Read every page — the drill slides
   in the middle carry the conjugations.
3. Phrases: her example sentences become library entries with new sequential ids
   and a `lesson: <n>` field. **Convert vosotros → ustedes** (the no-vosotros test
   covers the whole library). Never emit a bare conjugation ("yo era") as a
   phrase — build a real sentence. Insert as a contiguous block at the chosen
   unlock position (id ≠ array position).
4. Lessons: append a `lessons.js` object (`n` stable forever). Reference example
   phrases by id so audio and level dots come free. Reference **tables keep her
   vosotros row** with a Spain-only note — reference ≠ flashcards.
5. Exercise answers: fill in what she left blank; when a blank genuinely accepts
   two answers, say so in `note` rather than asserting one. Open-ended prompts
   get `a: ""`. Never label content as "not on her slides" unless verified against
   the PDF — a false attribution is worse than none; the per-lesson disclaimer in
   `lessonDetailHtml` covers provenance generally.
6. `tools/gen_audio.py` (idempotent) → `node --test` → commit to main.

## Deploy & dev
- GitHub: `ahoberman/hablo` (public). Live: https://ahoberman.github.io/hablo/
  GitHub Pages from main root — **deploy = commit to main** (~1 min build).
- Local dev: "hablo" entry in `~/Documents/Claude/.claude/launch.json`
  (python http.server, port 8643).
- Tests: `node --test test/` must pass before any commit touching srs.js or
  phrases.js.
