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
          assert.strictEqual(r.length, b.head.length, l.n + " ragged table row: " + JSON.stringify(r));
        }
      }
      if (b.type === "examples") {
        assert.ok(Array.isArray(b.ids) && b.ids.length, l.n + " examples ids");
        for (const id of b.ids) assert.ok(BYID.has(id), l.n + " unknown phrase id " + id);
      }
      if (b.type === "exercise") {
        assert.ok(b.prompt && b.prompt.trim(), l.n + " exercise prompt");
        assert.ok(Array.isArray(b.items) && b.items.length, l.n + " exercise items");
        for (const it of b.items) {
          assert.ok(it.q && it.q.trim(), l.n + " exercise item missing q");
          assert.strictEqual(typeof it.a, "string", l.n + " item a must be a string");
          assert.strictEqual(typeof (it.note === undefined ? "" : it.note), "string",
            l.n + " item note must be a string");
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

test("every lesson has phrases in the library", () => {
  for (const l of L) {
    const n = P.filter(p => p.lesson === l.n).length;
    assert.ok(n > 0, "lesson " + l.n + " has no phrases");
  }
});
