# Riverbank Surgery — private project workspace

A small static website holding the Riverbank Surgery project's overview,
timeline, documents and key information.

Privacy is enforced by **Cloudflare Access**: visitors enter their email,
Cloudflare emails them a one-time PIN, and only allow-listed addresses
get in. There is **no in-page password** — the gate is at the host.

For step-by-step deployment instructions written for non-developers, see
**[DEPLOY.md](DEPLOY.md)**.

## Pages

- `index.html` — landing page with tiles linking to the rest
- `overview.html` — summary, objectives, scope, stakeholders, status
- `timeline.html` — milestones with done / current / upcoming markers
- `documents.html` — searchable document table; files live in `docs/`
- `information.html` — site, clinical, regulatory, funding, governance
- `updates.html` — progress notes
- `contact.html` — team contacts

## Editing content

Each page is plain HTML. Most sections include a small grey hint
pointing to the file to edit. Replace all `[bracketed placeholders]`
with real values.

To add a document:

1. Drop the file into `docs/`.
2. Add a new row in the table in `documents.html` with the title,
   category, date, and a link to the file.

To add a timeline milestone, copy a `<li class="timeline-item">` block in
`timeline.html`. Add `done` for past, `current` for active, or leave
blank for upcoming.

## Running locally

It's just static files — open `index.html` directly, or serve the
folder:

```
python3 -m http.server 8000
# then visit http://localhost:8000/
```

There is no login when running locally — the Cloudflare Access gate
only kicks in once the site is deployed behind Cloudflare.
