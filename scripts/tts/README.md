# Blog audio generation (Kokoro TTS)

Generates the "Listen to this article" MP3 for a blog post, locally — not
part of the site build. The site is static (GitHub Pages via
`.github/workflows/deploy.yml`), so CI has no way to run a TTS model
itself; the generated MP3 has to already exist in `public/audio/blog/`
and get committed like any other static asset.

## One-time setup

```bash
brew install espeak-ng ffmpeg   # phonemizer fallback + MP3 encoding
python3 -m venv scripts/tts/.venv
scripts/tts/.venv/bin/pip install -r scripts/tts/requirements.txt
```

The venv is gitignored — it's ~1GB+ with PyTorch and the Kokoro model
weights, fully reproducible from `requirements.txt`, not meant for git
history.

## Generating audio for a post

```bash
# One post (slug = filename under src/content/blog/, without .md)
scripts/tts/.venv/bin/python scripts/tts/generate.py gokwik-checkout-rto-reduction-shopify-india

# Every post that doesn't have audio yet
scripts/tts/.venv/bin/python scripts/tts/generate.py --all
```

Output lands at `public/audio/blog/<slug>.mp3`. The blog post page
(`src/pages/blog/[slug].astro`) checks at build time whether that file
exists and only renders the player if it does — so a post is never
"broken" for not having audio, it just doesn't show the player.

Commit the generated MP3 alongside your next push.

## How it works

`generate.py` strips the post's markdown down to narration-friendly plain
text (drops code blocks, tables, image syntax, raw URLs — keeps link
text and prose), feeds it to Kokoro, and transcodes the raw output to MP3
via `ffmpeg` (more reliably available than relying on `soundfile`'s
built-in MP3 writer, which depends on the installed `libsndfile` build).

Default voice is `af_heart` (Kokoro's American English voice) at normal
speed — change `VOICE` / `SPEED` at the top of `generate.py` if you want
something else. Full voice list: https://github.com/hexgrad/kokoro
