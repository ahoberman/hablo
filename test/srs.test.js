// Unit tests for srs.js — run with: node --test test/
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
