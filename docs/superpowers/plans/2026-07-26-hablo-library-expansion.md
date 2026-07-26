# Hablo Library Expansion v1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Grow the library 500 → 700 with Street Spanish (60), Verbs-in-action (100), and About-you (40) packs, interleaved into the unlock order with stable ids p501–p700, plus neural audio for every new phrase.

**Architecture:** Content-only expansion through the existing pipeline. One structural change: the validation test's positional-id assertion becomes an id-set-coverage assertion so array position (unlock order) decouples from id number. Two new categories surface in `CAT_META`. Audio via the existing idempotent `tools/gen_audio.py`.

**Tech Stack:** Same as v1 — vanilla JS data file, Node built-in test runner, edge-tts (scratchpad venv), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-07-26-hablo-library-expansion-design.md` (source of truth).
**Conventions:** v1 curation rules bind (LatAm, no vosotros, accents/¿¡, ≤ ~10 words, notes only when useful, no duplicate `es` strings — the test enforces).

---

## Id ↔ position scheme

Ids are allocated by pack (casual p501–p560, verbs p561–p660, about-you p661–p700) but entries are INSERTED at usefulness positions as clusters anchored to existing phrases:

| Cluster | Pack / content | Count | Insert after |
|---|---|---|---|
| A1 | casual greetings & particles (¿qué onda?, ¿qué más?, porfa, dale, listo, va, sale, órale, tranqui…) | 15 | p020 "¿Qué tal?" |
| B1 | high-frequency present verbs (quiero…, puedo…, tengo que…, voy a…, sé…, conozco…, busco…) | 30 | p099 "Casi." |
| A2 | casual transactional (me das un café, me traes…, está chido, ¿cuánto sale?…) | 15 | p123 "Un café con leche." |
| B2 | preterite verbs (fui, estuve, hice, vi, comí, llegué, salí, compré, pagué, me quedé…) | 35 | p174 "Fui a la playa." |
| B3 | future/obligation/opinion verbs (voy a quedarme…, tendría que…, me gustaría…, debería…) | 35 | p305 "Fue un día largo." |
| A3 | remaining slang & reactions (no manches, neta, me late, ni modo, aguas, qué chévere, bacano…) | 30 | p350 "¡Qué buena onda!" |
| C1 | about-you past/future narrative (antes vivía en…, crecí en…, llevo tres años…, nunca he…) | 40 | p383 "Estoy pensando en mudarme." |

Cluster contents are curated at execution time under the spec's pack definitions; the validation suite is the acceptance gate. Region notes required on slang ("Mexico", "Colombia", "widely LatAm").

---

### Task 1: Decouple id order from array order in validation

**Files:**
- Modify: `test/phrases.test.js`

- [ ] **Step 1: Replace the positional-id test and count test** with a set-coverage test (self-consistent at any library size ≥ 500):

```js
const EXPECTED_COUNT = 500; // raised per content task; final = 700 (strictEqual then)

test("phrase count", () => {
  assert.ok(Array.isArray(P));
  assert.ok(P.length >= EXPECTED_COUNT, `expected >= ${EXPECTED_COUNT}, got ${P.length}`);
});

test("ids cover exactly p001..pN, each once, any order", () => {
  const ids = new Set(P.map(p => p.id));
  assert.strictEqual(ids.size, P.length, "duplicate id");
  for (let i = 1; i <= P.length; i++) {
    const id = "p" + String(i).padStart(3, "0");
    assert.ok(ids.has(id), "missing " + id);
  }
  for (const p of P) assert.match(p.id, /^p\d{3}$/);
});
```

(The old `ids are p### sequential and unique` test is deleted; everything else stays.)

- [ ] **Step 2: Run** `node --test` → all pass at 500 (assertion change is behavior-preserving on current data).

- [ ] **Step 3: Commit** — `git commit -am "test: id-set coverage replaces positional ordering"`

---

### Task 2: Street Spanish pack (p501–p560, clusters A1/A2/A3)

**Files:**
- Modify: `phrases.js` (three cluster insertions), `test/phrases.test.js`, `index.html` (CAT_META)

- [ ] **Step 1:** Add `"casual-slang"` to CATS in the test; raise `EXPECTED_COUNT` to `560`.
- [ ] **Step 2:** Add to CAT_META in index.html, directly after greetings-basics: `["casual-slang", "😎 Street Spanish"]`.
- [ ] **Step 3:** Insert clusters A1 (15, after p020), A2 (15, after p123), A3 (30, after p350) — 60 entries, cat `casual-slang`, ids p501–p560 in cluster order, register+region notes on every entry. Seeds that MUST appear: ¿Qué onda? · ¿Qué más? ¿Cómo vas? · Porfa · Dale · Órale · Sale · Va · Listo · Tranqui · Me das un café · No manches · Neta · Me late · Ni modo · Aguas · Qué chévere.
- [ ] **Step 4:** `node --test` → PASS (560; casual-slang ≥ 20 via min-cat test).
- [ ] **Step 5: Commit** — `git commit -am "feat: street spanish pack (60)"`

---

### Task 3: Verbs-in-action pack (p561–p660, clusters B1/B2/B3)

**Files:**
- Modify: `phrases.js`, `test/phrases.test.js`, `index.html` (CAT_META)

- [ ] **Step 1:** Add `"verbs-action"` to CATS; raise `EXPECTED_COUNT` to `660`.
- [ ] **Step 2:** CAT_META, directly after questions-connectors: `["verbs-action", "⚡ Verbs in action"]`.
- [ ] **Step 3:** Insert B1 (30 present, after p099), B2 (35 preterite, after p174), B3 (35 future/obligation/desire, after p305). 100 entries, cat `verbs-action`, ids p561–p660. Full natural sentences only — zero conjugation-table fragments. Coverage across ~70 distinct verbs; tense spread per spec (present / preterite / voy a / tengo que / acabo de / llevo / me gustaría / debería / podría).
- [ ] **Step 4:** `node --test` → PASS (660; verbs-action ≥ 20).
- [ ] **Step 5: Commit** — `git commit -am "feat: verbs in action pack (100)"`

---

### Task 4: About-you depth (p661–p700, cluster C1)

**Files:**
- Modify: `phrases.js`, `test/phrases.test.js`

- [ ] **Step 1:** Insert C1 (40, after p383) — cat `smalltalk-you`, ids p661–p700. Past/future self-narrative: antes vivía en…, crecí en…, llevo tres años con mi empresa, nunca he probado…, el año pasado fui a…, algún día quiero…, acabo de empezar…, de niño…
- [ ] **Step 2:** Set `EXPECTED_COUNT = 700` and make the count test `assert.strictEqual(P.length, 700)`.
- [ ] **Step 3:** `node --test` → PASS (exact 700).
- [ ] **Step 4: Commit** — `git commit -am "feat: about-you depth pack (40); library complete at 700"`

---

### Task 5: Neural audio for new phrases

- [ ] **Step 1:** Run the existing generator (idempotent — regenerates nothing for p001–p500):

```bash
cd /Users/andyhoberman/Documents/hablo && \
/private/tmp/claude-501/-Users-andyhoberman-Documents-Claude/d153adb6-1213-4379-a295-b41f13a601e3/scratchpad/venv/bin/python tools/gen_audio.py
```

Expected output: `generated=200 skipped=500 failed=0`. (If the scratchpad venv is gone: `python3 -m venv <scratch>/venv && <scratch>/venv/bin/pip install edge-tts` first.)

- [ ] **Step 2:** Spot-check: `ls audio | wc -l` → 700; `file audio/p501.mp3` → MPEG audio.
- [ ] **Step 3: Commit** — `git add audio && git commit -m "feat: neural audio for expansion phrases"`

---

### Task 6: Verify in browser, deploy, update memory

- [ ] **Step 1:** Dev server (`preview_start {name:"hablo"}` if not running). Verify: Frases shows 14 categories with 😎 Street Spanish (60) and ⚡ Verbs in action (100); search "onda" finds ¿Qué onda?; tapping it plays its recording; with a simulated learned state, a fresh session's new cards include early casual phrases (¿Qué onda? appears well before old p090s); `node --test` green.
- [ ] **Step 2:** Push to deploy: `git push`. Confirm live: `curl -s -o /dev/null -w "%{http_code}" https://ahoberman.github.io/hablo/audio/p501.mp3` → 200.
- [ ] **Step 3:** Update `hablo_app.md` memory (700 phrases, two new categories, id/position decoupling note) — MEMORY.md hook line already exists.

## Self-review notes (completed)

- Spec coverage: packs→Tasks 2–4, ordering decoupling→Task 1, CAT_META→2/3, audio→5, testing+deploy→6. Counts: 60+100+40=200; 500+200=700 ✓. Cluster sums: A=15+15+30=60 ✓, B=30+35+35=100 ✓, C=40 ✓.
- Placeholders: content curated at execution under binding rules + seed lists + test gate (same contract as v1 plan).
- Consistency: `EXPECTED_COUNT` raises 560→660→700 match cluster landings; CATS additions precede their content in the same task.
