#!/usr/bin/env python3
"""Generate a "listen to this post" MP3 for one blog post using Kokoro TTS,
run locally - not part of the site build. Output goes to public/audio/blog/
and gets committed like any other static asset (see scripts/tts/README.md
for why: CI builds the site but has no way to run Kokoro itself).

Usage:
    scripts/tts/.venv/bin/python scripts/tts/generate.py <slug>
    scripts/tts/.venv/bin/python scripts/tts/generate.py --all

<slug> matches the filename (without .md) under src/content/blog/.
"""

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

import soundfile as sf

REPO_ROOT = Path(__file__).resolve().parents[2]
BLOG_DIR = REPO_ROOT / "src/content/blog"
OUTPUT_DIR = REPO_ROOT / "public/audio/blog"

VOICE = "af_heart"  # a clear, natural US English voice; see Kokoro voices list
SPEED = 1.0


def strip_markdown(text: str) -> str:
    """Reduce a blog post's markdown body to plain narration text. Not a
    general-purpose markdown parser - just enough to stop Kokoro reading
    out asterisks, pipes, and raw URLs."""
    # Code blocks and inline code - skip entirely, they don't narrate well.
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`[^`]+`", "", text)
    # Images - drop, alt text isn't meant to be read aloud mid-sentence.
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    # Links - keep the visible text, drop the URL.
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    # Tables - too structurally lossy to narrate well; drop whole lines.
    text = re.sub(r"^\|.*\|$", "", text, flags=re.MULTILINE)
    text = re.sub(r"^:?-{2,}:?\s*(\|:?-{2,}:?\s*)+$", "", text, flags=re.MULTILINE)
    # Headings, blockquote markers, list bullets, emphasis, hr rules.
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^>\s?", "", text, flags=re.MULTILINE)
    text = re.sub(r"^[-*]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\d+\.\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"^-{3,}$", "", text, flags=re.MULTILINE)
    # Collapse blank-line runs left behind by the stripping above.
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def load_post(slug: str) -> tuple[str, str]:
    path = BLOG_DIR / f"{slug}.md"
    if not path.exists():
        sys.exit(f"No post found at {path}")
    raw = path.read_text()
    if not raw.startswith("---"):
        sys.exit(f"{path} has no frontmatter block")
    _, frontmatter, body = raw.split("---", 2)
    title_match = re.search(r'^title:\s*"(.+)"\s*$', frontmatter, re.MULTILINE)
    title = title_match.group(1) if title_match else slug
    return title, strip_markdown(body)


def generate(slug: str, pipeline) -> Path:
    title, body = load_post(slug)
    narration = f"{title}.\n\n{body}"

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    wav_path = OUTPUT_DIR / f"{slug}.wav"
    mp3_path = OUTPUT_DIR / f"{slug}.mp3"

    import numpy as np

    chunks = [audio for _, _, audio in pipeline(narration, voice=VOICE, speed=SPEED)]
    full_audio = np.concatenate(chunks)
    # Kokoro outputs 24kHz float32 PCM - write that raw (always supported),
    # then transcode to MP3 via ffmpeg. Relying on soundfile to write MP3
    # directly depends on the installed libsndfile build supporting it,
    # which isn't guaranteed; ffmpeg is the reliable path.
    sf.write(wav_path, full_audio, 24000)

    if shutil.which("ffmpeg") is None:
        print("  ffmpeg not found - leaving output as .wav (install ffmpeg for a smaller .mp3)")
        return wav_path

    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path), "-codec:a", "libmp3lame", "-qscale:a", "4", str(mp3_path)],
        check=True,
    )
    wav_path.unlink()
    return mp3_path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("slug", nargs="?", help="Blog post slug (filename without .md)")
    parser.add_argument("--all", action="store_true", help="Generate for every post missing audio")
    args = parser.parse_args()

    if not args.slug and not args.all:
        parser.error("pass a slug, or --all")

    from kokoro import KPipeline

    pipeline = KPipeline(lang_code="a")  # 'a' = American English

    slugs = [args.slug] if args.slug else [
        p.stem for p in BLOG_DIR.glob("*.md")
        if not (OUTPUT_DIR / f"{p.stem}.mp3").exists()
    ]

    for slug in slugs:
        print(f"Generating audio for: {slug}")
        out_path = generate(slug, pipeline)
        size_kb = out_path.stat().st_size / 1024
        print(f"  -> {out_path.relative_to(REPO_ROOT)} ({size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
