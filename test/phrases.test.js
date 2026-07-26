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
]);
const EXPECTED_COUNT = 500; // library complete

test("phrase count", () => {
  assert.ok(Array.isArray(P));
  assert.strictEqual(P.length, EXPECTED_COUNT);
});

test("every category has at least 20 phrases", () => {
  const counts = {};
  for (const p of P) counts[p.cat] = (counts[p.cat] || 0) + 1;
  for (const c of CATS) assert.ok((counts[c] || 0) >= 20, c + ": " + (counts[c] || 0));
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
