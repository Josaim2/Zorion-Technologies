"""A tiny, dependency-free slug helper."""

import re


def slugify(text: str) -> str:
    """Convert a string into a URL-friendly slug.

    Lowercases the text, replaces any run of non-alphanumeric characters
    with a single hyphen, and trims leading and trailing hyphens.

    >>> slugify("Hello World")
    'hello-world'
    """
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")
