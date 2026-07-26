#!/usr/bin/env python3
"""Generate audio/<id>.mp3 for every phrase in phrases.js (idempotent —
existing files are skipped, so adding phrases only generates the new ones).

Usage:   python3 tools/gen_audio.py        (needs: pip install edge-tts; node on PATH)
Voice:   Microsoft neural es-MX Dalia — regenerate everything after changing VOICE.
"""
import asyncio
import json
import subprocess
import sys
from pathlib import Path

import edge_tts

VOICE = "es-MX-DaliaNeural"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "audio"
CONCURRENCY = 5
RETRIES = 3
MIN_BYTES = 1000  # anything smaller is a truncated/failed download


def phrases():
    script = (
        "global.window={};"
        f"require({json.dumps(str(ROOT / 'phrases.js'))});"
        "console.log(JSON.stringify(window.PHRASES))"
    )
    out = subprocess.run(["node", "-e", script], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


async def gen(sem, p):
    dest = OUT / f"{p['id']}.mp3"
    if dest.exists() and dest.stat().st_size >= MIN_BYTES:
        return "skip"
    async with sem:
        for attempt in range(RETRIES):
            try:
                await edge_tts.Communicate(p["es"], VOICE).save(str(dest))
                if dest.stat().st_size >= MIN_BYTES:
                    return "ok"
            except Exception:
                await asyncio.sleep(2 * (attempt + 1))
        if dest.exists():
            dest.unlink()  # never leave a broken file that idempotency would skip
        return f"FAIL {p['id']}"


async def main():
    OUT.mkdir(exist_ok=True)
    ps = phrases()
    sem = asyncio.Semaphore(CONCURRENCY)
    results = await asyncio.gather(*(gen(sem, p) for p in ps))
    ok = sum(r == "ok" for r in results)
    skip = sum(r == "skip" for r in results)
    fails = [r for r in results if r.startswith("FAIL")]
    print(f"generated={ok} skipped={skip} failed={len(fails)}")
    for f in fails:
        print(f)
    sys.exit(1 if fails else 0)


asyncio.run(main())
