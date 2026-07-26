# Hablo — Spanish Phrase Trainer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static, mobile-first spaced-repetition flashcard app that teaches Andy ~500 conversational Latin American Spanish phrases with device text-to-speech, live on GitHub Pages.

**Architecture:** Three static files, no build step. `index.html` holds all app code (HTML/CSS/vanilla JS, Rebuild-app pattern). `phrases.js` is content-only (`window.PHRASES` array; array order = unlock order). `srs.js` is the pure spaced-repetition logic — dual browser/Node module so it's unit-testable with `node --test` (zero dependencies). State is one JSON blob in localStorage (`hablo:srs-v1`).

**Tech Stack:** Vanilla JS, Web Speech API (speechSynthesis), localStorage, Node 24 built-in test runner (dev only), GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-07-26-hablo-spanish-trainer-design.md` — read it first. It is the source of truth for behavior.

**Working directory:** `/Users/andyhoberman/Documents/hablo` (already a git repo with the spec committed).

---

## File structure

| File | Responsibility |
|---|---|
| `index.html` | Entire app: markup, CSS, storage shim, state, audio, 3 tabs (Today/Library/Progress) |
| `phrases.js` | `window.PHRASES = [...]` — 500 entries, content only, never logic |
| `srs.js` | Pure functions: dates, grading, session building, streak. No DOM, no storage |
| `test/srs.test.js` | Unit tests for srs.js (`node --test`) |
| `test/phrases.test.js` | Schema/content validation for phrases.js (`node --test`) |
| `icon.png` | 180×180 apple-touch-icon |
| `README.md`, `CLAUDE.md` | Docs / future-session context |

Conventions: 2-space indent, semicolons, storage key prefix `hablo:`, dates are local-time `YYYY-MM-DD` strings everywhere.

---

### Task 1: Scaffold repo docs

**Files:**
- Create: `README.md`
- Create: `CLAUDE.md`

- [ ] **Step 1: Write README.md**

```markdown
# Hablo — Spanish Phrase Trainer

Spaced-repetition flashcards for the ~500 most useful conversational Latin
American Spanish phrases. English prompt → say it in Spanish → reveal + hear
it → self-grade. Static site, no backend; progress lives in localStorage.

Live: https://ahoberman.github.io/hablo/
Deploy: commit to main (GitHub Pages).
Tests: `node --test test/`
```

- [ ] **Step 2: Write CLAUDE.md** — condensed project context: what the app is, the three-file architecture, the SRS rules table from the spec, the "never re-key/wipe localStorage without migration" rule, phrase id stability rule (ids never renumbered), deploy = commit to main, dev server = "hablo" entry in `~/Documents/Claude/.claude/launch.json` (port 8643), tests = `node --test test/`. Point to the spec file for full details.

- [ ] **Step 3: Commit**

```bash
git add README.md CLAUDE.md && git commit -m "docs: scaffold README and CLAUDE.md"
```

---

### Task 2: srs.js — date helpers (TDD)

**Files:**
- Create: `srs.js`
- Create: `test/srs.test.js`

- [ ] **Step 1: Write failing tests**

```js
// test/srs.test.js
const test = require("node:test");
const assert = require("node:assert");
const SRS = require("../srs.js");

test("todayStr formats a Date as local YYYY-MM-DD", () => {
  assert.strictEqual(SRS.todayStr(new Date(2026, 0, 5)), "2026-01-05");
  assert.strictEqual(SRS.todayStr(new Date(2026, 11, 31)), "2026-12-31");
});

test("addDays crosses month and year boundaries", () => {
  assert.strictEqual(SRS.addDays("2026-01-31", 1), "2026-02-01");
  assert.strictEqual(SRS.addDays("2026-12-31", 1), "2027-01-01");
  assert.strictEqual(SRS.addDays("2026-07-26", 90), "2026-10-24");
  assert.strictEqual(SRS.addDays("2026-03-01", -1), "2026-02-28");
});
```

- [ ] **Step 2: Run to verify failure** — `node --test test/` → FAIL (cannot find module '../srs.js').

- [ ] **Step 3: Implement srs.js with date helpers + module scaffold**

```js
// srs.js — pure spaced-repetition logic for Hablo. No DOM, no storage.
// Browser: window.SRS. Node (tests): module.exports.
(function (root) {
  const INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30, 6: 90 };
  const MAX_LVL = 6;

  function pad(n) { return String(n).padStart(2, "0"); }

  function todayStr(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  // Construct at noon local so DST shifts can't change the calendar day.
  function addDays(dateStr, n) {
    const [y, m, day] = dateStr.split("-").map(Number);
    const d = new Date(y, m - 1, day, 12);
    d.setDate(d.getDate() + n);
    return todayStr(d);
  }

  const SRS = { INTERVALS, MAX_LVL, todayStr, addDays };
  if (typeof module !== "undefined" && module.exports) module.exports = SRS;
  else root.SRS = SRS;
})(this);
```

- [ ] **Step 4: Run tests** — `node --test test/` → PASS (2 tests).

- [ ] **Step 5: Commit** — `git add srs.js test/srs.test.js && git commit -m "feat: srs date helpers"`

---

### Task 3: srs.js — grading (TDD)

**Files:**
- Modify: `srs.js` (add functions to the SRS object)
- Modify: `test/srs.test.js` (append)

- [ ] **Step 1: Write failing tests**

```js
test("newCard is unseen level 0", () => {
  assert.deepStrictEqual(SRS.newCard(), { lvl: 0, due: null, seen: 0, misses: 0 });
});

test("gradeGot advances level and schedules by interval", () => {
  const c = SRS.gradeGot(SRS.newCard(), "2026-07-26");
  assert.deepStrictEqual(c, { lvl: 1, due: "2026-07-27", seen: 1, misses: 0 });
  const c3 = SRS.gradeGot({ lvl: 3, due: "2026-07-26", seen: 5, misses: 1 }, "2026-07-26");
  assert.strictEqual(c3.lvl, 4);
  assert.strictEqual(c3.due, "2026-08-09"); // +14
});

test("gradeGot caps at level 6 (stays mastered, +90d)", () => {
  const c = SRS.gradeGot({ lvl: 6, due: "2026-07-26", seen: 9, misses: 0 }, "2026-07-26");
  assert.strictEqual(c.lvl, 6);
  assert.strictEqual(c.due, "2026-10-24");
});

test("gradeMiss resets to level 1, due tomorrow, counts the miss", () => {
  const c = SRS.gradeMiss({ lvl: 5, due: "2026-07-26", seen: 8, misses: 2 }, "2026-07-26");
  assert.deepStrictEqual(c, { lvl: 1, due: "2026-07-27", seen: 9, misses: 3 });
});
```

- [ ] **Step 2: Run to verify failure** — `node --test test/` → new tests FAIL (newCard is not a function).

- [ ] **Step 3: Implement** (inside the IIFE, added to the exported object)

```js
function newCard() { return { lvl: 0, due: null, seen: 0, misses: 0 }; }

function gradeGot(card, today) {
  const lvl = Math.min(card.lvl + 1, MAX_LVL);
  return { lvl, due: addDays(today, INTERVALS[lvl]), seen: card.seen + 1, misses: card.misses };
}

function gradeMiss(card, today) {
  return { lvl: 1, due: addDays(today, 1), seen: card.seen + 1, misses: card.misses + 1 };
}
```

- [ ] **Step 4: Run tests** — `node --test test/` → all PASS.

- [ ] **Step 5: Commit** — `git commit -am "feat: srs grading"`

---

### Task 4: srs.js — session building + streak (TDD)

**Files:**
- Modify: `srs.js`, `test/srs.test.js`

- [ ] **Step 1: Write failing tests**

```js
const LIB = [
  { id: "p001", es: "a", en: "a", cat: "x" },
  { id: "p002", es: "b", en: "b", cat: "x" },
  { id: "p003", es: "c", en: "c", cat: "x" },
  { id: "p004", es: "d", en: "d", cat: "x" },
];

test("buildSession: due reviews oldest-first, then new cards in library order", () => {
  const cards = {
    p002: { lvl: 2, due: "2026-07-20", seen: 3, misses: 0 }, // overdue (oldest)
    p001: { lvl: 1, due: "2026-07-26", seen: 1, misses: 0 }, // due today
    p003: { lvl: 4, due: "2026-08-01", seen: 6, misses: 0 }, // not due
  };
  const s = SRS.buildSession(LIB, cards, "2026-07-26", 10);
  assert.deepStrictEqual(s.reviews, ["p002", "p001"]);
  assert.deepStrictEqual(s.news, ["p004"]); // only unseen phrase
});

test("buildSession caps new cards at newPerDay", () => {
  const s = SRS.buildSession(LIB, {}, "2026-07-26", 2);
  assert.deepStrictEqual(s.news, ["p001", "p002"]);
  assert.deepStrictEqual(s.reviews, []);
});

test("updateStreak: same day no-op, consecutive increments, gap resets", () => {
  assert.deepStrictEqual(SRS.updateStreak({ count: 3, lastDay: "2026-07-26" }, "2026-07-26"),
    { count: 3, lastDay: "2026-07-26" });
  assert.deepStrictEqual(SRS.updateStreak({ count: 3, lastDay: "2026-07-25" }, "2026-07-26"),
    { count: 4, lastDay: "2026-07-26" });
  assert.deepStrictEqual(SRS.updateStreak({ count: 3, lastDay: "2026-07-20" }, "2026-07-26"),
    { count: 1, lastDay: "2026-07-26" });
  assert.deepStrictEqual(SRS.updateStreak({ count: 0, lastDay: null }, "2026-07-26"),
    { count: 1, lastDay: "2026-07-26" });
});
```

- [ ] **Step 2: Run to verify failure** — `node --test test/` → FAIL.

- [ ] **Step 3: Implement**

```js
// phrases: library array (order = unlock order); cards: {id: state}
function buildSession(phrases, cards, today, newPerDay) {
  const reviews = phrases
    .filter(p => cards[p.id] && cards[p.id].due && cards[p.id].due <= today)
    .sort((a, b) => (cards[a.id].due < cards[b.id].due ? -1 : cards[a.id].due > cards[b.id].due ? 1 : 0))
    .map(p => p.id);
  const news = phrases.filter(p => !cards[p.id]).slice(0, newPerDay).map(p => p.id);
  return { reviews, news };
}

function updateStreak(streak, today) {
  if (streak.lastDay === today) return streak;
  const count = streak.lastDay === addDays(today, -1) ? streak.count + 1 : 1;
  return { count, lastDay: today };
}
```

- [ ] **Step 4: Run tests** — `node --test test/` → all PASS.

- [ ] **Step 5: Commit** — `git commit -am "feat: srs session builder and streak"`

---

### Task 5: phrases.js — validation test + Tier 1 content (p001–p055)

Phrase content is generated by the implementing agent following the curation
rules below. The validation test is the acceptance gate for every content task.

**Curation rules (all tiers):**
- Latin American Spanish. No vosotros forms. `ustedes` for plural you.
- `tú` forms for casual phrases; note `usted` politeness in `note` where it matters.
- Proper accents and ¿ ¡ everywhere. The `es` string is what gets spoken.
- Short enough to say from memory (≤ ~10 words with rare exceptions).
- `note` only when genuinely useful ("informal", "polite form", "very LatAm slang").
- Array order = unlock order. Order by usefulness within each tier.
- Categories (slugs): `greetings-basics`, `courtesy`, `smalltalk-you`,
  `questions-connectors`, `getting-around`, `food-restaurants`,
  `money-shopping`, `time-plans`, `opinions-reactions`, `feelings-states`,
  `emergencies-help`, `daily-life`.
- Library-wide targets (exact totals may flex ±5 per category, enforced
  minimum 20 each, total exactly 500): greetings-basics 30, courtesy 25,
  smalltalk-you 55, questions-connectors 60, getting-around 50,
  food-restaurants 55, money-shopping 40, time-plans 45,
  opinions-reactions 55, feelings-states 35, emergencies-help 25,
  daily-life 25.

**Files:**
- Create: `phrases.js`
- Create: `test/phrases.test.js`

- [ ] **Step 1: Write the validation test** (the count assertion starts at `>= 55` and is raised in each content task)

```js
// test/phrases.test.js
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "phrases.js"), "utf8");
const window = {};
new Function("window", src)(window);
const P = window.PHRASES;

const CATS = new Set([
  "greetings-basics", "courtesy", "smalltalk-you", "questions-connectors",
  "getting-around", "food-restaurants", "money-shopping", "time-plans",
  "opinions-reactions", "feelings-states", "emergencies-help", "daily-life",
]);
const EXPECTED_COUNT = 55; // raised in each content task; final = 500

test("phrase count", () => {
  assert.ok(Array.isArray(P));
  assert.ok(P.length >= EXPECTED_COUNT, `expected >= ${EXPECTED_COUNT}, got ${P.length}`);
});

test("ids are p### sequential and unique", () => {
  P.forEach((p, i) => {
    assert.strictEqual(p.id, "p" + String(i + 1).padStart(3, "0"),
      `index ${i} has id ${p.id}`);
  });
});

test("required fields and valid categories", () => {
  for (const p of P) {
    assert.ok(p.es && p.es.trim(), p.id + " missing es");
    assert.ok(p.en && p.en.trim(), p.id + " missing en");
    assert.ok(CATS.has(p.cat), p.id + " bad cat: " + p.cat);
    assert.ok(typeof p.note === "string", p.id + " note must be string (may be empty)");
  }
});

test("no duplicate Spanish phrases", () => {
  const seen = new Set();
  for (const p of P) {
    const k = p.es.toLowerCase();
    assert.ok(!seen.has(k), "duplicate es: " + p.es);
    seen.add(k);
  }
});

test("no vosotros forms", () => {
  for (const p of P) {
    assert.ok(!/vosotr|habéis|estáis|sois|tenéis/i.test(p.es), p.id + ": " + p.es);
  }
});
```

- [ ] **Step 2: Run to verify failure** — `node --test test/phrases.test.js` → FAIL (phrases.js missing).

- [ ] **Step 3: Write Tier 1 (p001–p055): survival essentials.** Tier 1 mixes categories — it's the day-one phrases. It MUST include verbatim the 15 phrases Andy approved in the design conversation (below), plus ~40 more curated to the rules (buenos días/tardes/noches, adiós/hasta luego, ¿qué tal?, me llamo…, soy de…, disculpe, con permiso, lo siento, ¿habla inglés?, ¿puede repetir?, está bien, claro, sí/no/tal vez, ¿dónde está…?, necesito ayuda, un momento, etc.):

```js
window.PHRASES = [
  { id: "p001", es: "Hola, ¿cómo estás?", en: "Hi, how are you?", cat: "greetings-basics", note: "informal" },
  { id: "p002", es: "Bien, gracias. ¿Y tú?", en: "Good, thanks. And you?", cat: "greetings-basics", note: "" },
  { id: "p003", es: "Mucho gusto.", en: "Nice to meet you.", cat: "greetings-basics", note: "" },
  { id: "p004", es: "Por favor.", en: "Please.", cat: "courtesy", note: "" },
  { id: "p005", es: "Gracias.", en: "Thank you.", cat: "courtesy", note: "" },
  { id: "p006", es: "De nada.", en: "You're welcome.", cat: "courtesy", note: "" },
  { id: "p007", es: "Perdón, no entiendo.", en: "Sorry, I don't understand.", cat: "greetings-basics", note: "" },
  { id: "p008", es: "¿Puedes hablar más despacio?", en: "Can you speak more slowly?", cat: "greetings-basics", note: "" },
  { id: "p009", es: "¿Cómo se dice esto en español?", en: "How do you say this in Spanish?", cat: "greetings-basics", note: "" },
  { id: "p010", es: "No hablo mucho español.", en: "I don't speak much Spanish.", cat: "greetings-basics", note: "" },
  { id: "p011", es: "¿Dónde está el baño?", en: "Where is the bathroom?", cat: "getting-around", note: "" },
  { id: "p012", es: "¿Cuánto cuesta?", en: "How much does it cost?", cat: "money-shopping", note: "" },
  { id: "p013", es: "Quisiera esto, por favor.", en: "I'd like this, please.", cat: "food-restaurants", note: "polite" },
  { id: "p014", es: "La cuenta, por favor.", en: "The check, please.", cat: "food-restaurants", note: "" },
  { id: "p015", es: "No sé.", en: "I don't know.", cat: "questions-connectors", note: "" },
  // p016–p055 curated per the rules above
];
```

- [ ] **Step 4: Run tests** — `node --test test/phrases.test.js` → PASS with ≥55 phrases.

- [ ] **Step 5: Commit** — `git add phrases.js test/phrases.test.js && git commit -m "feat: phrase library tier 1 (survival essentials) + validation"`

---

### Task 6: phrases.js — Tier 2 (p056–p170): high-frequency everyday

- [ ] **Step 1:** Append 115 phrases: everyday questions and answers (¿de dónde eres?, ¿a qué te dedicas?), core getting-around (directions, taxi/uber, izquierda/derecha/derecho), core food ordering (para mí…, ¿qué me recomiendas?, sin/con, agua/cerveza, mesa para dos), basic money (¿aceptan tarjeta?, efectivo), basic time (¿a qué hora…?, hoy/mañana/ahora/luego/ya), and the first connector set (pero, porque, entonces, también, o sea, es que…). Respect category budgets; usefulness order.
- [ ] **Step 2:** Raise `EXPECTED_COUNT` to `170`. Run `node --test test/phrases.test.js` → PASS.
- [ ] **Step 3: Commit** — `git commit -am "feat: phrase library tier 2 (everyday core)"`

### Task 7: phrases.js — Tier 3 (p171–p315): real conversation

- [ ] **Step 1:** Append 145 phrases: fuller small talk (family, weekend, likes: me gusta/me encanta/prefiero), opinions & reactions (me parece que…, ¿en serio?, qué bueno/qué pena, tiene sentido, depende, tienes razón), feelings & states (estoy cansado/emocionado/nervioso, tengo hambre/sed/sueño/prisa), plans (¿qué vas a hacer…?, vamos a…, ¿quieres…?, nos vemos), deeper restaurant/shopping situations, and emergencies-help core (necesito un médico, llame a la policía, me siento mal, ¿me puedes ayudar?).
- [ ] **Step 2:** Raise `EXPECTED_COUNT` to `315`. Run tests → PASS.
- [ ] **Step 3: Commit** — `git commit -am "feat: phrase library tier 3 (real conversation)"`

### Task 8: phrases.js — Tier 4 (p316–p500): fluency glue + depth

- [ ] **Step 1:** Append 185 phrases: the full connector/filler arsenal (la verdad es que…, lo que pasa es que…, de hecho, por cierto, en cambio, aunque, sin embargo, digamos, bueno pues…, ¡qué buena onda!), hedges and repairs (se me olvidó la palabra, dame un segundo), opinion depth (estoy de acuerdo, no estoy tan seguro, desde mi punto de vista), daily-life depth (weather, phone/wifi, laundry, pharmacy), filling remaining category budgets to exactly 500 total.
- [ ] **Step 2:** Set `EXPECTED_COUNT = 500`, change the count assertion to `assert.strictEqual(P.length, 500)`, and add:

```js
test("every category has at least 20 phrases", () => {
  const counts = {};
  for (const p of P) counts[p.cat] = (counts[p.cat] || 0) + 1;
  for (const c of CATS) assert.ok((counts[c] || 0) >= 20, c + ": " + (counts[c] || 0));
});
```

- [ ] **Step 3:** Run tests → PASS. **Commit** — `git commit -am "feat: complete 500-phrase library"`

---

### Task 9: index.html — skeleton, storage, state, tabs

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the skeleton.** Head metas (home-screen app), Google Fonts (Barlow Condensed 600/700 + Inter 400/600 — Rebuild's pairing), CSS custom properties, bottom tab nav, three `<section>` views, storage shim + state block, script tags.

Required structure (real code; CSS body is the agent's to write against the tokens and layout rules in the comment):

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Hablo">
<link rel="apple-touch-icon" href="icon.png">
<title>Hablo — Spanish Trainer</title>
<!-- Google Fonts: Barlow Condensed 600,700 + Inter 400,600 -->
<style>
  :root {
    --bg: #101418; --card: #1a2027; --ink: #f2f4f6; --muted: #8b98a5;
    --accent: #ff7a1a;         /* warm Spanish orange */
    --good: #34c77b; --bad: #ff5d5d; --line: #2a3340;
  }
  /* mobile-first; 480px max content width centered; touch targets >= 48px;
     bottom nav fixed with env(safe-area-inset-bottom) padding;
     Barlow Condensed for headings/buttons, Inter for body */
</style>
</head>
<body>
  <main>
    <section id="view-today"></section>
    <section id="view-library" hidden></section>
    <section id="view-progress" hidden></section>
  </main>
  <nav id="tabs">
    <button data-tab="today" class="active">Hoy</button>
    <button data-tab="library">Frases</button>
    <button data-tab="progress">Progreso</button>
  </nav>
  <script>
    // ---- storage shim (Rebuild pattern) ----
    window.storage = {
      get(key) { const v = localStorage.getItem("hablo:" + key); return v === null ? null : { key, value: v }; },
      set(key, value) { localStorage.setItem("hablo:" + key, value); return { key, value }; },
      delete(key) { localStorage.removeItem("hablo:" + key); return { key }; },
    };
  </script>
  <script src="phrases.js"></script>
  <script src="srs.js"></script>
  <script>
    // ---- app ----
    function defaultState() {
      return { v: 1, cards: {}, newPerDay: 10, streak: { count: 0, lastDay: null }, log: {} };
    }
    function load() {
      try {
        const raw = storage.get("srs-v1");
        if (!raw) return defaultState();
        const s = JSON.parse(raw.value);
        if (!s || s.v !== 1 || typeof s.cards !== "object") return defaultState();
        return Object.assign(defaultState(), s);
      } catch (e) { return defaultState(); }
    }
    let DB = load();
    function save() {
      try { storage.set("srs-v1", JSON.stringify(DB)); }
      catch (e) { notice("Couldn't save progress — storage may be full or blocked."); }
    }
    // notice(msg): small dismissible banner at top of the active view
    // tab switching: nav buttons toggle .active + section[hidden],
    //   then call the view's render fn: renderToday()/renderLibrary()/renderProgress()
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser.** Add the "hablo" launch.json entry now (see Task 14 Step 2 for exact JSON), then `preview_start {name: "hablo"}`. Confirm: three tabs switch views, no console errors, `PHRASES.length === 500` and `SRS.MAX_LVL === 6` in console.

- [ ] **Step 3: Commit** — `git add index.html && git commit -m "feat: app skeleton with tabs, storage, state"`

---

### Task 10: Audio (speechSynthesis)

**Files:**
- Modify: `index.html` (app script block)

- [ ] **Step 1: Implement**

```js
// ---- audio ----
let VOICE = null;
function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  const vs = speechSynthesis.getVoices().filter(v => v.lang && /^es/i.test(v.lang));
  VOICE =
    vs.find(v => /es[-_]MX/i.test(v.lang) && /paulina/i.test(v.name)) ||
    vs.find(v => /es[-_]MX/i.test(v.lang)) ||
    vs.find(v => /es[-_]US/i.test(v.lang)) ||
    vs[0] || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.addEventListener("voiceschanged", pickVoice);
}
// rate: 0.9 normal, 0.6 slow. Returns false when unavailable (caller shows notice once).
function speak(text, rate) {
  if (!("speechSynthesis" in window) || !VOICE) return false;
  speechSynthesis.cancel(); // avoid queue pileup on rapid taps
  const u = new SpeechSynthesisUtterance(text);
  u.voice = VOICE; u.lang = VOICE.lang; u.rate = rate || 0.9;
  speechSynthesis.speak(u);
  return true;
}
```

- [ ] **Step 2: Verify in browser** — console: `speak("¿Dónde está el baño?")` speaks Spanish (desktop Chrome ships es voices); `VOICE.lang` starts with "es". Test slow: `speak("La verdad es que no sé", 0.6)`.

- [ ] **Step 3: Commit** — `git commit -am "feat: spanish tts with voice selection"`

---

### Task 11: Today tab — full session flow

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Implement session state + flow.** Behavior (from spec): queue = due reviews (oldest first) + `newPerDay` new; card shows category chip + big English; **Show Spanish** reveals es text + note + auto-plays audio; 🔊 replay + 🐢 slow buttons; **Missed it / Got it**. First grade of a card in the session writes SRS state + log + streak; a missed card recycles to the end of the queue until answered Got (those later answers change only the queue). Progress indicator = "N left". Wrap-up screen: reviews done, new learned, streak, and "Practice 10 random known phrases" (random lvl≥1 cards, reveal+audio flow only, no state changes).

Core logic (UI rendering around it is the agent's to write, matching the skeleton's structure):

```js
let session = null; // { queue: [id], answered: Set, revealed: bool, doneRev: 0, doneNew: 0, practice: bool }

function startSession() {
  const today = SRS.todayStr();
  const { reviews, news } = SRS.buildSession(PHRASES, DB.cards, today, DB.newPerDay);
  session = { queue: reviews.concat(news), answered: new Set(), revealed: false,
              doneRev: 0, doneNew: 0, practice: false };
  renderToday();
}

function grade(got) {
  const id = session.queue.shift();
  const today = SRS.todayStr();
  if (!session.practice && !session.answered.has(id)) {
    session.answered.add(id);
    const card = DB.cards[id] || SRS.newCard();
    const wasNew = card.lvl === 0;
    DB.cards[id] = got ? SRS.gradeGot(card, today) : SRS.gradeMiss(card, today);
    const entry = DB.log[today] || { rev: 0, new: 0 };
    wasNew ? entry.new++ : entry.rev++;
    DB.log[today] = entry;
    DB.streak = SRS.updateStreak(DB.streak, today);
    wasNew ? session.doneNew++ : session.doneRev++;
    save();
  }
  if (!got && !session.practice) session.queue.push(id); // recycle
  session.revealed = false;
  renderToday();
}
```

- [ ] **Step 2: Verify in browser (full loop).** Fresh state → session offers 10 new cards; reveal auto-speaks; miss recycles to end and reappears; got clears; wrap-up shows correct counts and streak 1. Then simulate the next day in console:

```js
// make everything due yesterday to test review flow + overdue accumulation
let s = JSON.parse(storage.get("srs-v1").value);
Object.values(s.cards).forEach(c => c.due = "2026-07-25");
storage.set("srs-v1", JSON.stringify(s)); location.reload();
```

Confirm reviews appear before new cards, oldest due first.

- [ ] **Step 3: Verify edges:** clear localStorage → fresh state, no crash. Reload mid-session → session rebuilds cleanly from state (graded cards don't reappear; session is rebuilt, not resumed — per spec).

- [ ] **Step 4: Commit** — `git commit -am "feat: today session flow with recycle and wrap-up"`

---

### Task 12: Library tab

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Implement.** Search input filtering on es+en, case/accent-insensitive (normalize both sides with `.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")`). Phrases grouped under category headers — display names + emoji defined in a `CAT_META` object listing all 12 slugs in display order (e.g. `{ slug: "smalltalk-you", label: "Small talk", emoji: "🗣" }`). Each row: es (bold) + en (muted) + 6 level dots (filled up to lvl in accent color; all empty for unseen) + tapping the row speaks the phrase.

- [ ] **Step 2: Verify in browser:** search "baño" and "bathroom" both find p011; "como se dice" (no accents) finds "¿Cómo se dice…?"; tap speaks; dots match known levels; all 12 categories render.

- [ ] **Step 3: Commit** — `git commit -am "feat: library tab with search and tap-to-hear"`

---

### Task 13: Progress tab

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Implement.** Stat tiles: streak (days), learning (lvl 1–5 count), mastered (lvl 6 count), not seen (total − seen). 7-day bar chart from `DB.log` (rev+new per day, last 7 local days, today rightmost; pure CSS bars). Settings: new-cards-per-day segmented control (5/10/15/20) writing `DB.newPerDay` + save(). Backup: export button downloads `hablo-backup-YYYY-MM-DD.json` (raw state blob via Blob + a[download]); import: file input → JSON.parse → validate `s.v === 1 && typeof s.cards === "object"` → `confirm()` showing card count before replacing → save + re-render. Unknown phrase ids in imported state are kept, not deleted (spec rule).

- [ ] **Step 2: Verify in browser:** stats match hand-computed state; chart shows today's session; newPerDay = 5 → next fresh session offers 5 new; export → clear localStorage → import → state round-trips identically.

- [ ] **Step 3: Commit** — `git commit -am "feat: progress tab with stats, chart, settings, backup"`

---

### Task 14: Icon, dev server entry, full verification pass

**Files:**
- Create: `icon.png`
- Modify: `/Users/andyhoberman/Documents/Claude/.claude/launch.json` (add entry)

- [ ] **Step 1: Generate icon.png** (180×180, accent-orange, white "¡H!"):

```bash
cd /Users/andyhoberman/Documents/hablo && python3 -c "
from PIL import Image, ImageDraw, ImageFont
img = Image.new('RGB', (180, 180), '#ff7a1a')
d = ImageDraw.Draw(img)
f = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 100)
d.text((90, 86), '¡H!', font=f, anchor='mm', fill='white')
img.save('icon.png')"
```

If PIL is missing and `pip3 install --user pillow` is undesirable, fallback: render the same design as a 180×180 HTML page in the browser pane and screenshot it to icon.png.

- [ ] **Step 2: Add launch.json entry** (append to `configurations`, matching existing format):

```json
{ "name": "hablo", "runtimeExecutable": "python3",
  "runtimeArgs": ["-m", "http.server", "8643", "--directory", "/Users/andyhoberman/Documents/hablo"],
  "port": 8643 }
```

- [ ] **Step 3: Full verification checklist** (browser pane, from spec Testing section): session flow end-to-end; recycle-on-miss; SRS date math via the Task 11 console simulation; library search; export/import round-trip; speech normal + slow; mobile viewport (375×812) — no horizontal scroll, comfortable touch targets; `node --test test/` all green.

- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: icon and dev server entry"`

---

### Task 15: Deploy to GitHub Pages

- [ ] **Step 1: Create repo + push** (public; Andy's GitHub user is **ahoberman**). Confirm with Andy before this step if not already blanket-approved — it publishes the repo:

```bash
cd /Users/andyhoberman/Documents/hablo
gh repo create ahoberman/hablo --public --source=. --push
```

- [ ] **Step 2: Enable Pages from main root:**

```bash
gh api repos/ahoberman/hablo/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

- [ ] **Step 3: Verify live** (~1 min build): `https://ahoberman.github.io/hablo/` → 200 in the browser pane; no 404s for phrases.js/srs.js/icon.png; run one full card through the flow.

- [ ] **Step 4:** Tell Andy to open the URL on his iPhone, add to home screen, and confirm voice quality — the one check only he can do on-device.

---

## Post-deploy (not part of the app)

- Save a `hablo` project memory file (repo path, live URL, deploy = commit to main, storage key rule, id stability rule) and add it to MEMORY.md.

## Self-review notes (completed)

- Spec coverage: architecture→Tasks 1/9, phrase data→5–8, SRS→2–4/11, Today→11, Library→12, Progress→13, audio→10, error handling→9/11/13, testing→14, deploy→15. Practice mode in 11. Notice banner in 9.
- Type consistency: card state `{lvl, due, seen, misses}` and state blob `{v, cards, newPerDay, streak, log}` identical across Tasks 2–4, 9, 11, 13. `grade(got)` name consistent in 11.
- Known intentional gap: phrase content beyond the 15 approved seeds is generated at execution time under the curation rules, gated by the validation tests (content generation, not code placeholders).
