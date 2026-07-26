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

  function newCard() { return { lvl: 0, due: null, seen: 0, misses: 0 }; }

  function gradeGot(card, today) {
    const lvl = Math.min(card.lvl + 1, MAX_LVL);
    return { lvl, due: addDays(today, INTERVALS[lvl]), seen: card.seen + 1, misses: card.misses };
  }

  function gradeMiss(card, today) {
    return { lvl: 1, due: addDays(today, 1), seen: card.seen + 1, misses: card.misses + 1 };
  }

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

  const SRS = { INTERVALS, MAX_LVL, todayStr, addDays, newCard, gradeGot, gradeMiss,
                buildSession, updateStreak };
  if (typeof module !== "undefined" && module.exports) module.exports = SRS;
  else root.SRS = SRS;
})(this);
