from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/images/icon.png"
TARGETS = {
    "assets/images/icon.png": 512,
    "assets/images/splash-icon.png": 512,
    "assets/images/android-icon-foreground.png": 512,
    "assets/images/favicon.png": 128,
}


def main() -> None:
    with Image.open(SOURCE) as image:
        original = image.convert("RGBA")
        for relative_path, size in TARGETS.items():
            output = original.copy()
            output.thumbnail((size, size), Image.Resampling.LANCZOS)
            output.save(ROOT / relative_path, format="PNG", optimize=True, compress_level=9)


if __name__ == "__main__":
    main()
