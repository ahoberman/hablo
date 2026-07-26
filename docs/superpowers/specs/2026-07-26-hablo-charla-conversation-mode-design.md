# Hablo — Charla (AI Conversation Mode) Design Spec

**Date:** 2026-07-26
**Owner:** Andy Hoberman
**Status:** Approved design, pre-implementation
**Depends on:** Hablo v1 (shipped 2026-07-26; see 2026-07-26-hablo-spanish-trainer-design.md)

## What this is

A fourth tab, **Charla**, that gives Hablo users live AI conversation practice
in Spanish, grounded in the phrases they have actually learned. Works for any
user of the public app (no Claude account or API key needed on their side);
Andy's Anthropic API key powers it from behind a proxy.

## Decisions made (with Andy, 2026-07-26)

1. **Full AI in-app** (not scripted dialogues, not paste-into-Claude): the app
   is going on phones of people without Claude.
2. **Model: Sonnet** (claude-sonnet-5) — noticeably more natural than Haiku for
   conversation; ~15–25¢ per session is acceptable. Model pinned in the Worker,
   one-line change to swap.
3. **Andy's API key** funds usage, held server-side with hard guardrails; he
   accepts a few dollars/month worst case.
4. **Unlock gate:** 50 learned phrases (lvl ≥ 1), per device.
5. **Input:** tap-to-talk mic (Web SpeechRecognition, es-MX; tap again to stop)
   with an always-visible typing fallback.
6. **Conversations never modify SRS state** — flashcards remain the system of
   record; Charla is practice.

## Architecture

- **App (unchanged hosting):** static on GitHub Pages. New Charla tab in
  `index.html` calls the Worker over HTTPS.
- **Worker (`worker/` in repo):** Cloudflare Worker, free tier, deployed with
  wrangler. Endpoint: `POST /chat` with JSON
  `{ scenario, messages: [{role, content}...], learned: [{es, lvl}...] }`.
  Returns `{ reply }` (assistant text) or a typed error
  (`{ error: "rate_limited" | "upstream" | "bad_request", resetHint? }`).
- **Secrets:** `ANTHROPIC_API_KEY` set via `wrangler secret put` — Andy pastes
  the key himself; it never appears in the repo, the app bundle, or chat.
- **Worker responsibilities:** hold the key; pin model + max_tokens (~300);
  assemble the system prompt server-side (so the vocabulary-leash logic can't
  be stripped by a client); enforce guardrails; CORS-allow only the app origin
  (`https://ahoberman.github.io`) plus localhost for dev.

### Guardrails (in the Worker, per structural cost cap)

- Per-IP: 10 conversation requests/minute, 150/day (simple KV counter with a
  daily key).
- Per-request: messages array capped at 24 turns; each message ≤ 500 chars;
  learned list capped at 600 entries.
- max_tokens ≤ 300, model pinned server-side. Temperature default.
- Worst case ≈ caps × Sonnet pricing → single-digit dollars/day even under
  abuse; realistically pennies.

## The AI's leash (system prompt, assembled in the Worker)

Sonnet plays the scenario character (taxi driver, waiter, new acquaintance,
market vendor, hotel clerk — or picks one for "surprise me"). Instructions:

- Speak Latin American Spanish. Sentences ≤ ~10 words. One question at a time.
- Stay overwhelmingly inside the user's learned vocabulary (the `learned` list,
  with levels, is embedded in the prompt); introduce at most one unfamiliar
  word per exchange and only when natural.
- Gently correct mistakes inline ("Casi — se dice *quisiera un taxi*"), then
  continue the scene. Never lecture.
- Ramp difficulty with the size/level of the learned list.
- After ~10 user turns (the app includes the turn count), wrap up the scene and
  deliver a short English report card: 2–3 things done well, 2–3 phrases to
  review (quoting exact library phrases where possible).

## Charla tab UX

- **Locked state (< 50 learned):** padlock card — "Learn 50 phrases to unlock
  live conversation. 37/50" with a progress bar. (Count = cards with lvl ≥ 1.)
- **Scenario picker:** cards — 🚕 Taxi, 🌮 Restaurante, 👋 Conocerse,
  🛒 Mercado, 🏨 Hotel, 🎲 Sorpréndeme.
- **Chat screen:** message bubbles (AI left, user right). Each AI reply is
  spoken via device TTS (the existing fallback-voice pipeline — recorded Dalia
  files can't speak dynamic text) and shown as text. Composer: mic button
  (SpeechRecognition, lang es-MX; tap to talk, tap to stop) + text input +
  send. Mic unsupported/denied → mic button hidden, typing only, no nagging.
- **Session flow:** AI opens the scene in Spanish. ~10 user turns → wrap-up +
  report card → "Otra charla" button. Leaving the tab abandons the session
  (sessions are ephemeral; nothing persisted except a daily-usage counter).
- **Errors:** Worker/API down → "La charla está durmiendo 😴 — try again in a
  bit" card; rate cap → same card with reset hint. Flashcards unaffected.

## Data & privacy

- Sent to the Worker per request: scenario id, the conversation so far, and
  the learned-phrase list (es + lvl only — no ids, no stats, no identity).
- Nothing stored server-side beyond ephemeral rate-limit counters (IP-keyed,
  daily expiry). No accounts, no logging of conversation content.
- App-side: no conversation history persisted; the unlock gate reads the
  existing `cards` state — no new fields in the storage blob.

## Testing

- Worker: `wrangler dev` locally — curl checks for guardrails (turn caps, size
  caps, CORS, rate-limit path) and a real conversation round-trip (key in a
  gitignored `.dev.vars`).
- App: browser-pane end-to-end against the deployed Worker — locked state,
  unlock at 50 (simulated state), full conversation with typed input, TTS
  speaking replies, error card with Worker stopped.
- Andy on iPhone: mic dictation quality and home-screen behavior (only
  verifiable on device).

## Deploy logistics (one-time, needs Andy)

1. Free Cloudflare account (or existing login) + `wrangler login` in terminal.
2. `wrangler deploy` from `worker/`, then `wrangler secret put ANTHROPIC_API_KEY`
   — Andy pastes the key at the prompt himself.
3. Worker URL baked into index.html as a constant.

## Out of scope

- Voice output via API TTS (device voice is fine; revisit if quality grates).
- Persisting conversation transcripts or cross-device sync.
- Per-user API keys, accounts, or payments (revisit only if the app grows a
  real user base and costs matter).
- Scripted no-AI dialogue mode (subsumed by this).
