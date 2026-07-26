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
