# Hablo — Teacher Lessons Integration (Design Spec)

**Date:** 2026-08-05
**Owner:** Andy Hoberman
**Status:** Approved design, pre-implementation

## What this is

Andy takes Spanish lessons with a teacher who sends slide-deck PDFs. This
integrates that material into Hablo two ways: her example sentences become
spaced-repetition flashcards with neural audio, and her lessons become a
browsable reference section with her rules, conjugation tables, and practice
exercises (with answers behind a tap).

**Source material (this batch):** 11 PDFs, lessons 54–67, 140 pages, all with
embedded text. From `~/Downloads/drive-download-20260805T005126Z-1-001.zip`,
extracted to the session scratchpad.

| Lesson | Topic | Decks |
|---|---|---|
| 54, 55 | Verbs ser & estar in the past tense | lesson + practice + homework |
| 58, 59, 60 | Past progressive | lesson + conjugation + practice |
| 61, 62 | Prepositions of place | lesson + practice homework |
| 66, 67 | Each, all, both, none | lesson + practice + homework |

Deck anatomy: **rule slides** (e.g. "Ser = permanent states; Estar = temporary
states or location"), **table slides** (conjugation grids), **drill slides**
(one form per slide: "Yo era / estaba — I was", plus negative variants), and
**practice decks** (translate these, complete the blanks, change to past
tense, write your own — no answer keys provided).

The numbering implies lessons 1–53 exist and more will follow, so the
process must be repeatable for future drops.

## Decisions made (with Andy, 2026-08-05)

1. **Shape:** both — lesson-derived phrases in the SRS *and* a new Lecciones
   reference tab. (Not phrases-only, not reference-only; an interactive quiz
   mode built from her exercises is explicitly deferred.)
2. **Vosotros:** flashcards are Latin American only — her vosotros examples
   convert to ustedes (`Vosotros sois ingenieros` → `Ustedes eran ingenieros`).
   Reference tables still display her vosotros row, labeled as Spain-only, so
   he can follow along in class.
3. **Exercise answers:** included, hidden behind a "Show answer" tap.
   Genuinely ambiguous blanks (some ser/estar choices work either way) are
   presented as such rather than asserting one answer.
4. **Unlock position:** lesson phrases are grouped by lesson and start around
   array position 110 — after the everyday core, so they don't crowd out the
   recently-added Street Spanish. Tunable by moving the insertion points.

## Architecture

New content file, mirroring the `phrases.js` pattern (content only, never
logic):

- **`lessons.js`** — `window.LESSONS = [...]`, one object per lesson.
- **`index.html`** — gains a 4th tab (📚 Lecciones) and its renderer; two new
  helpers; four new `CAT_META` entries. No other app logic changes.
- **`test/lessons.test.js`** — structural validation, mirroring
  `test/phrases.test.js`.
- **`phrases.js`** — ~150 new entries (ids p701+), inserted at usefulness
  positions per the established id≠position rule.
- **`audio/`** — one Dalia MP3 per new phrase via the existing idempotent
  `tools/gen_audio.py`.

### Lesson data model

```js
{ n: 54,                                   // lesson number = stable identity
  es: "Verbo ser y estar en pasado",
  en: "Verbs ser and estar in the past tense",
  cat: "past-ser-estar",                   // links to the phrase category
  blocks: [
    { type: "rule", es: "Ser — estados permanentes",
      en: "Ser — permanent states or essential characteristics" },
    { type: "table", head: ["", "Ser", "Estar"],
      rows: [["Yo", "era", "estaba"], ["Tú", "eras", "estabas"]],
      note: "The vosotros row is Spain only — not used in Latin America." },
    { type: "examples", ids: ["p701", "p702"] },   // reuse library phrases + audio
    { type: "exercise", prompt: "Complete the sentences",
      items: [{ q: "Mi gato ______ flaco, ahora es muy gordo.",
                a: "era", note: "" }] },
  ] }
```

Rules:
- `n` is stable forever; lessons are keyed by it.
- `blocks` render in order — the lesson reads top to bottom like her deck.
- `examples` blocks reference phrase ids, so example audio and level dots come
  free from the existing phrase machinery. No duplicated Spanish strings.
- `exercise` items always have `q`; `a` is the answer (empty string ONLY for
  open-ended "write your own" prompts, which render without a Show answer
  control); `note` carries ambiguity flags ("estaba also works here").

### Phrase additions

Four new categories, added to `CAT_META` after `verbs-action`:

| Slug | Display | Approx count |
|---|---|---|
| `past-ser-estar` | ⏮️ Past: ser & estar | ~40 |
| `past-progressive` | 🔄 Past progressive | ~40 |
| `prepositions-place` | 📍 Prepositions of place | ~35 |
| `quantifiers` | 🔢 Each, all, both, none | ~35 |

Each lesson-derived phrase carries `lesson: <n>`. Existing phrases keep no
`lesson` field (absent = not lesson-derived).

Curation rules from v1 bind: Latin American only, no vosotros (test enforced),
proper accents and ¿¡, full natural sentences, `note` only when useful.
Conjugation fragments are NOT phrases — drill slides become usable sentences
("Yo era muy tímido de niño"), never bare "yo era".

Insertion: grouped by lesson, in lesson order, starting after array position
~110, so each lesson's phrases arrive as a coherent set.

## Screens

### New tab: 📚 Lecciones (4th tab, after Progreso)

- **Index:** one row per lesson — number, Spanish title, English subtitle,
  phrase count. Newest lessons first (descending `n`), since recent material is
  what he's actively studying.
- **Detail:** blocks rendered in order. Rules as cards; tables as real tables
  (with the Spain-only note where present); examples as tappable rows that play
  the recorded audio; exercises with a **Show answer** button per item that
  reveals `a` plus any `note`. Open-ended prompts show no button.
- **Practice these phrases** button at the bottom: starts a session containing
  only that lesson's phrases. Reuses the existing practice-mode mechanism, so
  it does NOT alter SRS state.
- Back control returns to the index.

### Existing Hoy tab

Cards for lesson-derived phrases show an extra chip: **Lección 54**. Tapping it
opens that lesson's detail page (switches tab, scrolled to top). Non-lesson
phrases are unchanged.

## Error handling & edge cases

- `lessons.js` absent or malformed → the Lecciones tab renders "No lessons
  loaded" and the rest of the app works normally.
- An `examples` block referencing an unknown phrase id → that row is skipped,
  not rendered broken. (The test also catches this before commit.)
- Lesson practice with zero resolvable phrases → button hidden.
- A phrase whose `lesson` has no matching entry in LESSONS → chip renders as
  plain text, not a dead link.
- No storage schema change: `hablo:srs-v1` is untouched, so no migration.
  Lesson reading state is not persisted (nothing worth persisting).

## Testing

- **`test/lessons.test.js`:** every lesson has numeric unique `n`, non-empty
  `es`/`en`, a known `cat`, ≥1 block; every block has a valid `type`; tables
  have consistent row widths; every `examples` id exists in PHRASES; every
  exercise item has non-empty `q` and a string `a`; every phrase with a
  `lesson` field points at an existing lesson.
- **`test/phrases.test.js`:** unchanged assertions, new exact total, four new
  category slugs, no-vosotros still enforced across the whole library.
- **Browser:** Lecciones index lists 4 lessons; a detail page renders rules,
  tables, examples (audio plays), and Show answer reveals; the lesson chip on a
  Hoy card navigates to the lesson; per-lesson practice runs and leaves SRS
  state unchanged; `node --test` green.
- **Andy on phone:** confirm the lesson pages read well and the answers match
  what his teacher expects.

## Repeatability (future lesson drops)

Documented in `CLAUDE.md`: unzip new PDFs to a scratch folder → extract each
deck's rules/tables/examples/exercises → append phrases with new sequential
ids, inserted at chosen positions → append lesson objects to `lessons.js` →
run `tools/gen_audio.py` (idempotent) → `node --test` → commit.

## Out of scope

- Interactive quiz/drill mode built from her exercises (deferred; needs a new
  card type and grading logic).
- Lessons 1–53 (not provided in this batch).
- Persisting per-lesson "completed" state.
- Charla (AI conversation tab) — separate spec, still on hold.
