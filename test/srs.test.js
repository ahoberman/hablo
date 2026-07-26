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
