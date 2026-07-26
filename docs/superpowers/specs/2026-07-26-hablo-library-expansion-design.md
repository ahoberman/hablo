# Hablo — Library Expansion v1.1 (Street Spanish + Verbs + About-You)

**Date:** 2026-07-26
**Owner:** Andy Hoberman
**Status:** Approved design, pre-implementation
**Source:** Andy's friend's Anki/HyperTTS workflow transcript — we implement the
content insights through Hablo's existing pipeline (SRS + neural audio), not
the Anki tooling. Charla (AI conversation spec, same date) is ON HOLD.

## What this adds

~200 new phrases (library ~500 → ~700) closing the two gaps the transcript
nails: systematic verb coverage as natural sentences, and the casual register
people actually use — plus deeper "about you" conversation material.

1. **Street Spanish pack (~60)** — new category `casual-slang`
   (display: "😎 Street Spanish"). ¿Qué onda?, ¿qué más? ¿cómo vas?,
   me das un café, porfa, dale, órale, sale, va, no manches, está chido,
   tranqui, qué chévere, etc. Every entry's `note` marks register + region
   ("casual", "Mexico", "Colombia", "widely LatAm"). Textbook siblings stay in
   the library; notes differentiate (polite vs. street).
2. **Verbs in action pack (~100)** — new category `verbs-action`
   (display: "⚡ Verbs in action"). Top ~70 verbs, each as 1–2 short natural
   sentences. Deliberate tense spread: present, preterite (fui, estuve, hice,
   vi, comí), near future (voy a…), obligation (tengo que…), recent past
   (acabo de…), duration (llevo…). NO conjugation tables — full usable
   sentences only.
3. **About-you depth (~40)** — existing category `smalltalk-you`. Past/future
   self-narrative: antes vivía en…, crecí en…, llevo tres años con mi
   empresa, nunca he probado…, el año pasado fui a…, algún día quiero…

Curation rules from v1 spec still bind (LatAm, no vosotros, accents/¿¡,
≤ ~10 words, note only when useful).

## Structural change: unlock order ≠ id order

- New phrases take **stable ids p501+** (append-numbered, never reused) but are
  **inserted into the PHRASES array at their usefulness position** — array
  order remains the unlock order. High-frequency casual phrases land near the
  front so they surface as upcoming new cards immediately.
- SRS state is id-keyed → existing user progress (including Andy's) is
  untouched by reordering. No storage migration needed.
- Validation test changes: replace the "id equals p{index+1}" assertion with
  "the id set is exactly {p001…pNNN}, each appearing once, any order"
  (N = final count). Keep: format `p\d{3}`, no duplicate es strings, required
  fields, valid categories, no vosotros, per-category minimum 20, exact total
  asserted at completion.

## App changes (only these)

- `CAT_META`: add `casual-slang` (after greetings-basics) and `verbs-action`
  (after questions-connectors) with the display names above.
- `test/phrases.test.js`: CATS set + ordering assertion + total as described.
- Nothing else: SRS, session flow, Frases dropdowns, Progress, audio playback
  all operate on data and are unchanged.

## Audio

- Run existing `tools/gen_audio.py` (idempotent) → generates es-MX Dalia MP3s
  for only the new ids. Commit MP3s with the content (~3MB added).

## Testing

- `node --test` green at the new exact total with the new assertions.
- Browser pane: both new categories render with counts; a fresh session's new
  cards include early-interleaved casual phrases; a new phrase (e.g. ¿Qué
  onda?) plays its recording; library search finds new entries.
- Andy on phone: next session should surface casual phrases as new cards.

## Out of scope

- Pack on/off toggles (single interleaved stream keeps the SRS simple).
- Any Charla work (separate spec, on hold).
- Accent/voice alternatives for recordings (es-MX Dalia stays the voice).
