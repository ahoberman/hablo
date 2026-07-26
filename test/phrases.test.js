// Validation for phrases.js — run with: node --test
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
  "casual-slang",
]);
const EXPECTED_COUNT = 560; // raised per expansion pack; final = 700 (strictEqual then)

test("phrase count", () => {
  assert.ok(Array.isArray(P));
  assert.ok(P.length >= EXPECTED_COUNT, `expected >= ${EXPECTED_COUNT}, got ${P.length}`);
});

test("every category has at least 20 phrases", () => {
  const counts = {};
  for (const p of P) counts[p.cat] = (counts[p.cat] || 0) + 1;
  for (const c of CATS) assert.ok((counts[c] || 0) >= 20, c + ": " + (counts[c] || 0));
});

// Array position = unlock order; id = stable identity. They are decoupled:
// every id p001..pN must exist exactly once, at any position.
test("ids cover exactly p001..pN, each once, any order", () => {
  const ids = new Set(P.map(p => p.id));
  assert.strictEqual(ids.size, P.length, "duplicate id");
  for (let i = 1; i <= P.length; i++) {
    const id = "p" + String(i).padStart(3, "0");
    assert.ok(ids.has(id), "missing " + id);
  }
  for (const p of P) assert.match(p.id, /^p\d{3}$/);
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
