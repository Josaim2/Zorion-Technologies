# Zorion Technologies — website

A bilingual (EN/RU) marketing site for Zorion Technologies. Static HTML/CSS/JS,
no build step required.

## Structure

```
index.html         Home
about.html          About
services.html       Services
industries.html     Industries
contact.html        Contact
assets/css/         Shared stylesheet (design tokens, layout, components)
assets/js/main.js         Language switching, mobile nav, contact form UI
assets/js/i18n-data.js    All EN/RU copy, keyed by page.section.field
misc/slugify/       Unrelated starter script kept from an earlier commit
```

## Running locally

Any static file server works, e.g.:

```
python -m http.server 5173
```

Then open http://localhost:5173/index.html. (Opening the HTML files directly
via `file://` also works — the site has no fetch/CORS dependency.)

## Notes for future edits

- **Contact details** live in `assets/js/i18n-data.js` →
  `contact.detailAddressValue`, `detailPhoneValue`, `detailEmailValue`.
  The email address (`hello@zoriontechnologies.com`) should be updated once a
  real mailbox exists — the contact form sends to whatever address is shown
  on the page.
- **Contact form** (`contact.html`) works via the visitor's email client
  (`mailto:`). To collect submissions server-side instead, wire it to a form
  service or your own endpoint in `assets/js/main.js` (`initContactForm`).
- **Copy** across all pages can be edited in `assets/js/i18n-data.js`.
- **Logo** is a text wordmark ("Zorion.") styled in CSS — swap in a real logo
  file if you have one.
- **Colors** live as CSS custom properties at the top of `assets/css/style.css`
  (`--color-primary`, `--color-accent`, etc.) if you want to adjust the palette.

## Editing translations

All copy lives in `assets/js/i18n-data.js` under `en` and `ru` objects. Each
page's HTML references keys via `data-i18n="section.field"` — update the
text there rather than in the HTML files directly.
