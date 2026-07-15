# slugify

A tiny, dependency-free Python utility that turns arbitrary text into a
URL-friendly "slug".

```python
from slugify import slugify

slugify("Hello World")   # -> "hello-world"
```

## Rules

`slugify()`:

1. lowercases the text,
2. replaces any run of non-alphanumeric characters with a single hyphen, and
3. trims leading and trailing hyphens.

## Running the tests

```bash
python -m unittest
```
