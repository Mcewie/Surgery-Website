# Riverbank Surgery — private project workspace

A small static site holding the Riverbank Surgery project's overview,
timeline, documents and key information, behind an email + password gate.

## Pages

- `index.html` — sign in (email + password)
- `home.html` — landing tiles
- `overview.html` — summary, objectives, scope, stakeholders, status
- `timeline.html` — milestones with done / current / upcoming markers
- `documents.html` — searchable document table; files live in `docs/`
- `information.html` — site, clinical, regulatory, funding, governance
- `updates.html` — progress notes
- `contact.html` — team contacts

## Editing content

Each page is plain HTML — open the file and edit text directly. Most
sections include a small grey hint pointing to the file to edit. Replace
all `[bracketed placeholders]` with real values.

To add a document:

1. Drop the file into `docs/`.
2. Add a new row in the table in `documents.html` with the title,
   category, date, and a link to the file.

To add a timeline milestone, copy a `<li class="timeline-item">` block in
`timeline.html`. Add `done` for past, `current` for active, or leave
blank for upcoming.

## Access (the email + password gate)

The default credentials are:

- **Email:** any email (no whitelist by default)
- **Password:** `riverbank2026`

### Change the password

Open a browser dev-tools console and run:

```js
crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR-NEW-PASSWORD'))
  .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')));
```

Copy the printed hex string into `assets/auth.js` as the value of
`PASSWORD_HASH`.

### Restrict to specific emails

In `assets/auth.js`, set `ALLOWED_EMAILS` to a list of permitted
addresses, e.g.:

```js
const ALLOWED_EMAILS = ['alice@example.com', 'bob@example.com'];
```

Leave the array empty to accept any email (the password is the gate).

## Important: this gate is a deterrent, not real security

The password hash and the allowed-email list are baked into the static
JavaScript that the browser downloads, so a determined visitor with
dev-tools can read them. Use one of the following for genuine privacy:

- **Netlify Site Protection** — site-wide password (paid feature).
- **Cloudflare Access / Pages Access Policies** — email-link or SSO.
- **GitHub Pages + an authenticating proxy** (e.g. Cloudflare Access).
- **Vercel password protection** — site-wide password.
- A private host requiring login at the HTTP layer.

For a small private project that just needs to deter casual visitors,
the built-in gate is fine. Keep the repository **private** in either
case so the source isn't public.

## Running locally

It's just static files — open `index.html` directly, or serve the
folder:

```
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Deploy

Push to any static host:

- **Netlify / Vercel / Cloudflare Pages:** drag-drop the folder, or
  connect the repo. No build step.
- **GitHub Pages:** enable Pages on the `main` branch, root.

Combine with the host's password / access protection for real privacy.
