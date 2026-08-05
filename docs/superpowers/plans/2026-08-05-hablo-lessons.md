# Hablo Teacher Lessons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn 11 teacher lesson PDFs (lessons 54–67) into ~150 audio-backed SRS phrases in four new grammar categories plus a 📚 Lecciones reference tab with her rules, conjugation tables, and answer-revealing exercises.

**Architecture:** New content file `lessons.js` (`window.LESSONS`, content only) beside `phrases.js`; `index.html` gains a 4th tab renderer, four `CAT_META` entries, and a lesson chip on Hoy cards; `test/lessons.test.js` validates structure and cross-references. Extraction of the decks is done by a parallel agent fan-out that writes structured JSON to scratch, verified adversarially before assembly.

**Tech Stack:** Same as always — vanilla JS, Node built-in test runner, edge-tts via scratchpad venv, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-05-hablo-lessons-design.md` (source of truth).

**Source PDFs:** `<scratch>/lessons/*.pdf` (11 files, extracted from Andy's zip).
`<scratch>` = `/private/tmp/claude-501/-Users-andyhoberman-Documents-Claude/26a29f82-99f9-4e85-bbea-dc65ca05e0c7/scratchpad`

---

## Lesson groups (extraction units)

| Group | Lesson `n` | Category slug | PDFs |
|---|---|---|---|
| G1 | 54 | `past-ser-estar` | 54 lesson, 55 practice, 55 homework |
| G2 | 58 | `past-progressive` | 58 lesson, 59 conjugation, 60 practice |
| G3 | 61 | `prepositions-place` | 61 lesson, 62 practice homework |
| G4 | 66 | `quantifiers` | 66 lesson, 67 practice, 67 homework |

Lesson `n` = the primary lesson deck number; practice decks fold into the same
lesson object as `exercise` blocks.

---

### Task 1: Extract + verify deck content (agent fan-out)

**Output:** `<scratch>/extract/g1.json` … `g4.json`

- [ ] **Step 1: Run the extraction workflow.** Per group: one extractor agent reads its PDFs and writes JSON; two verifier agents then audit it on distinct lenses (Spanish correctness/LatAm compliance; exercise-answer correctness + faithfulness to the deck). Extractor rewrites on confirmed defects.

Each JSON file has this exact shape:

```json
{ "lesson": { "n": 54, "es": "Verbo ser y estar en pasado",
              "en": "Verbs ser and estar in the past tense",
              "cat": "past-ser-estar",
              "blocks": [
                {"type":"rule","es":"…","en":"…"},
                {"type":"table","head":["","Ser","Estar"],
                 "rows":[["Yo","era","estaba"]],
                 "note":"The vosotros row is Spain only — not used in Latin America."},
                {"type":"examplesRef","phraseIdx":[0,1,2]},
                {"type":"exercise","prompt":"Complete the sentences",
                 "items":[{"q":"Mi gato ______ flaco, ahora es muy gordo.",
                           "a":"era","note":""}]}
              ] },
  "phrases": [ {"es":"Yo era muy tímido de niño.",
                "en":"I was very shy as a kid.","note":""} ] }
```

`examplesRef.phraseIdx` holds indices into this file's `phrases` array; the
assembly step rewrites them to real `pXXX` ids.

- [ ] **Step 2: Sanity-check the four files** — valid JSON, 30–45 phrases each, every `examplesRef` index in range, no `vosotr|habéis|estáis|sois|tenéis|eráis` in any phrase `es`.
- [ ] **Step 3:** Nothing committed yet (scratch only — the repo is untouched).

---

### Task 2: Merge into phrases.js

**Files:** Modify `phrases.js`, `test/phrases.test.js`, `index.html`

- [ ] **Step 1:** Add the four slugs to `CATS` in `test/phrases.test.js`:
  `"past-ser-estar", "past-progressive", "prepositions-place", "quantifiers"`.
- [ ] **Step 2:** Add to `CAT_META` in `index.html`, directly after the `verbs-action` entry:

```js
      ["past-ser-estar", "⏮️ Past: ser & estar"],
      ["past-progressive", "🔄 Past progressive"],
      ["prepositions-place", "📍 Prepositions of place"],
      ["quantifiers", "🔢 Each, all, both, none"],
```

- [ ] **Step 3:** Assign ids p701+ in group order (G1, G2, G3, G4), dropping any phrase whose `es` already exists in the library (exact match, case-insensitive). Insert each group as a contiguous block: G1 after `p170`, then G2/G3/G4 immediately following — all four land consecutively past array position ~110–170, grouped by lesson per the spec. Every entry carries `cat` (group slug) and `lesson` (group `n`).
- [ ] **Step 4:** Set `EXPECTED_COUNT` in `test/phrases.test.js` to the resulting exact total, keeping the `strictEqual` assertion.
- [ ] **Step 5:** Run `node --test` → PASS (existing assertions all hold: unique ids p001..pN, no duplicate `es`, no vosotros, category minimums ≥20).
- [ ] **Step 6: Commit** — `git commit -am "feat: lesson-derived phrases in four grammar categories"`

---

### Task 3: lessons.js + validation test

**Files:** Create `lessons.js`, `test/lessons.test.js`

- [ ] **Step 1: Write `lessons.js`** — `window.LESSONS = [ … ]` with the four lesson objects, `examplesRef` blocks rewritten to `{type:"examples", ids:["p701",…]}` using the ids assigned in Task 2. Header comment mirrors `phrases.js`: content only, `n` stable forever, append-only.

- [ ] **Step 2: Write `test/lessons.test.js`**

```js
// Validation for lessons.js — run with: node --test
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const w = {};
new Function("window", fs.readFileSync(path.join(root, "phrases.js"), "utf8"))(w);
new Function("window", fs.readFileSync(path.join(root, "lessons.js"), "utf8"))(w);
const P = w.PHRASES, L = w.LESSONS;
const BYID = new Set(P.map(p => p.id));
const CATS = new Set(P.map(p => p.cat));
const TYPES = new Set(["rule", "table", "examples", "exercise"]);

test("lessons have unique numeric n, titles, known cat, blocks", () => {
  assert.ok(Array.isArray(L) && L.length > 0);
  const seen = new Set();
  for (const l of L) {
    assert.strictEqual(typeof l.n, "number", "n must be numeric");
    assert.ok(!seen.has(l.n), "duplicate lesson " + l.n);
    seen.add(l.n);
    assert.ok(l.es && l.es.trim(), l.n + " missing es title");
    assert.ok(l.en && l.en.trim(), l.n + " missing en title");
    assert.ok(CATS.has(l.cat), l.n + " unknown cat: " + l.cat);
    assert.ok(Array.isArray(l.blocks) && l.blocks.length, l.n + " has no blocks");
  }
});

test("blocks are well formed", () => {
  for (const l of L) {
    for (const b of l.blocks) {
      assert.ok(TYPES.has(b.type), l.n + " bad block type: " + b.type);
      if (b.type === "rule") {
        assert.ok(b.es && b.es.trim(), l.n + " rule missing es");
      }
      if (b.type === "table") {
        assert.ok(Array.isArray(b.head) && b.head.length, l.n + " table head");
        assert.ok(Array.isArray(b.rows) && b.rows.length, l.n + " table rows");
        for (const r of b.rows) {
          assert.strictEqual(r.length, b.head.length, l.n + " ragged table row");
        }
      }
      if (b.type === "examples") {
        assert.ok(Array.isArray(b.ids) && b.ids.length, l.n + " examples ids");
        for (const id of b.ids) assert.ok(BYID.has(id), l.n + " unknown id " + id);
      }
      if (b.type === "exercise") {
        assert.ok(b.prompt && b.prompt.trim(), l.n + " exercise prompt");
        assert.ok(Array.isArray(b.items) && b.items.length, l.n + " exercise items");
        for (const it of b.items) {
          assert.ok(it.q && it.q.trim(), l.n + " exercise item missing q");
          assert.strictEqual(typeof it.a, "string", l.n + " item a must be string");
          assert.strictEqual(typeof (it.note || ""), "string", l.n + " bad note");
        }
      }
    }
  }
});

test("every phrase with a lesson points at a real lesson", () => {
  const ns = new Set(L.map(l => l.n));
  for (const p of P) {
    if (p.lesson !== undefined) {
      assert.ok(ns.has(p.lesson), p.id + " references missing lesson " + p.lesson);
    }
  }
});
```

- [ ] **Step 3:** Run `node --test` → PASS (all suites).
- [ ] **Step 4: Commit** — `git add lessons.js test/lessons.test.js && git commit -m "feat: lessons data file and validation"`

---

### Task 4: Lecciones tab

**Files:** Modify `index.html`

- [ ] **Step 1: Load the data** — add `<script src="lessons.js"></script>` immediately after the `phrases.js` script tag, and guard: `const LESSONS = Array.isArray(window.LESSONS) ? window.LESSONS : [];`

- [ ] **Step 2: Add the tab** — a 4th button in `nav#tabs` (`data-tab="lessons"`, label `Clases`) and `<section id="view-lessons" hidden></section>` after `view-progress`. Register `lessons: renderLessons` in the `VIEWS` map.

- [ ] **Step 3: Implement the view.** State: `let openLesson = null;` (lesson `n` or null).

```js
function openLessonPage(n) {
  openLesson = n;
  document.querySelector('[data-tab="lessons"]').click();
  window.scrollTo(0, 0);
}
function lessonPhrases(n) { return PHRASES.filter(p => p.lesson === n); }

function renderLessons() {
  const v = document.getElementById("view-lessons");
  if (!LESSONS.length) {
    v.innerHTML = '<p class="muted" style="padding:12px 4px">No lessons loaded.</p>';
    return;
  }
  const l = LESSONS.find(x => x.n === openLesson);
  v.innerHTML = l ? lessonDetailHtml(l) : lessonIndexHtml();
}
```

Index: lessons sorted by `n` descending, each a `.prow`-style button showing
`Lección <n>`, `l.es`, `l.en`, and `lessonPhrases(l.n).length + " frases"`,
calling `openLessonPage(l.n)`.

Detail: a back button (`openLesson = null; renderLessons()`), the title, then
blocks in order —
- `rule` → card with `es` bold and `en` muted;
- `table` → `<table class="ltable">` from `head`/`rows` plus `note` in muted italics;
- `examples` → the existing phrase-row markup (es + en + level dots), each row
  calling `speakPhrase(id)`, skipping any id missing from the library;
- `exercise` → prompt heading, then each item's `q` with a `Show answer`
  button revealing `a` (+ `note` when present); items with empty `a` render
  the question only.

Footer: **Practicar estas frases** button when `lessonPhrases(n).length > 0`,
starting a practice-mode session over exactly those ids:

```js
function practiceLesson(n) {
  const ids = lessonPhrases(n).map(p => p.id);
  if (!ids.length) return;
  session = { queue: ids.slice(), answered: new Set(), revealed: false,
              doneRev: 0, doneNew: 0, total: ids.length, practice: true };
  document.querySelector('[data-tab="today"]').click();
  window.scrollTo(0, 0);
}
```

(`practice: true` is the existing flag that makes `grade()` skip all SRS
writes — per-lesson practice must not alter scheduling.)

- [ ] **Step 4: Add the lesson chip on Hoy cards.** In `renderToday`'s chips
  block, after the category chip, when `p.lesson !== undefined` and a matching
  lesson exists, render a tappable chip `Lección <n>` calling
  `openLessonPage(<n>)`; when no lesson matches, render the same text as a
  plain non-interactive chip.

- [ ] **Step 5: CSS** — reuse existing tokens. Add only: `.ltable` (full-width,
  `border-collapse`, `td/th` padding 8px, 1px `var(--line)` borders, `th`
  background `#232b34`), `.ex-item` (padding 10px 0, bottom border
  `var(--line)`), `.ex-a` (color `var(--good)`, weight 600). Wrap each table in
  a `div` with `overflow-x:auto` so wide tables never scroll the page.

- [ ] **Step 6: Verify in browser** (dev server `preview_start {name:"hablo"}`):
  Clases tab lists 4 lessons newest-first with correct phrase counts; opening
  Lección 54 renders rule cards, the ser/estar table with the Spain note, example
  rows that play audio, and Show answer reveals; back returns to the index;
  Practicar starts a per-lesson practice session and grading through it leaves
  `hablo:srs-v1` byte-identical; a Hoy card for a lesson phrase shows the
  Lección chip and tapping it opens that lesson.

- [ ] **Step 7: Commit** — `git commit -am "feat: lecciones tab with rules, tables, exercises, per-lesson practice"`

---

### Task 5: Audio, full verification, deploy

- [ ] **Step 1: Generate audio** (idempotent — only the new ids):

```bash
cd /Users/andyhoberman/Documents/hablo && \
/private/tmp/claude-501/-Users-andyhoberman-Documents-Claude/d153adb6-1213-4379-a295-b41f13a601e3/scratchpad/venv/bin/python tools/gen_audio.py
```

Expected: `generated=<new count> skipped=700 failed=0`. If that venv is gone:
`python3 -m venv <scratch>/venv && <scratch>/venv/bin/pip install edge-tts` first.

- [ ] **Step 2:** Confirm `ls audio | wc -l` equals the new library total and `file audio/p701.mp3` reports MPEG audio.
- [ ] **Step 3:** `node --test` → all suites green.
- [ ] **Step 4: Commit + push** — `git add -A && git commit -m "feat: audio for lesson phrases" && git push`
- [ ] **Step 5:** Verify live (~1 min build): `https://ahoberman.github.io/hablo/` → 200, `audio/p701.mp3` → 200, `lessons.js` → 200.

---

### Task 6: Document the repeatable pipeline

**Files:** Modify `CLAUDE.md`, memory `hablo_app.md`

- [ ] **Step 1:** Add an "Adding new teacher lessons" section to `CLAUDE.md`: unzip PDFs to scratch → extract rules/tables/examples/exercises per deck → append phrases with new sequential ids inserted at chosen positions (ids stable, position = unlock order) → append lesson objects to `lessons.js` (`n` stable) → `tools/gen_audio.py` → `node --test` → commit to main. Note the vosotros rule (convert in phrases, keep in reference tables with the Spain note).
- [ ] **Step 2:** Update the `hablo_app.md` memory: new total, four grammar categories, Clases tab, `lessons.js`, lesson-drop pipeline pointer.
- [ ] **Step 3: Commit** — `git commit -am "docs: lesson pipeline"`

## Self-review notes (completed)

- Spec coverage: extraction→T1, phrases+categories→T2, lessons.js+tests→T3, Lecciones tab + chip + per-lesson practice→T4, audio+deploy→T5, repeatability→T6. Vosotros handling appears in T1 (extraction rule) and T2 (test gate). Spec edge cases are covered in T4 Step 3 (missing ids skipped, empty-answer prompts) , T4 Step 4 (missing-lesson chip) and T4 Step 1 (malformed lessons.js guard).
- Placeholders: none — exact totals resolve at T2 Step 4 from real extraction output, the same contract as the prior plans.
- Consistency: the `practice: true` session shape matches the existing `grade()`/`renderToday()` contract; `speakPhrase(id)`, `BYID`, `CAT_META`, `.prow`, `VIEWS` all match current `index.html` names.
