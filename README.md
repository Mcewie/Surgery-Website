# Riverbank, Westcott — sale website

A small static website that presents Riverbank, Westcott to property
investors as an occupied commercial freehold, with the occupation dispute
and planning status disclosed clearly. It is based on the
*Riverbank Auction Website Framework* brief (27 September 2026).

**Status: draft for review.** It isn't live sale particulars. No auction
instruction, guide price, reserve or sale date has been confirmed yet.
Anything still waiting on verified information shows as an amber
**To confirm** marker.

## Files

- `index.html` is the main property page. Its sections are Property,
  Investment, Occupation, Planning, Documents, Auction and Register interest.
- `privacy.html` explains how enquiries are handled (a template the agent completes).
- `assets/style.css` holds the styles. `assets/main.js` runs the mobile menu,
  highlights the nav link for the section in view, and turns the enquiry
  form into an email.
- `assets/img/` holds photos and plans (see `assets/img/README.md`).
- `docs/` holds downloadable documents (see `docs/README.md`).

## Editing content

Each page is plain HTML. To fill in a placeholder, search for `todo` and
replace the whole `<span class="todo">…</span>` with the verified text.

- **Enquiry email:** set `AGENT_EMAIL` at the top of `assets/main.js`.
- **Planning status panel:** update the entries and the "Last checked"
  date whenever the published position changes.
- **Publish a document:** put the file in `docs/`, then in the Documents
  table replace "Available once published" with
  `<a href="docs/filename.pdf" download>Download PDF</a>` and fill in the date.
- **Register to bid:** set the button's `href` to the auctioneer's listing
  and remove `is-disabled` and `aria-disabled="true"`.

### Wording rules (from the brief)

Keep the headline, images and main copy as cautious as the small print:

- Don't promise vacant possession, a relocation date or residential consent.
- Don't describe the rent as secure or NHS-guaranteed.
- Don't describe the practice as unlawful occupiers.
- Present suggested plan amendments as suggestions, never as adopted policy.
- Label any future-use concept image *illustrative and unapproved*.

## Launch checklist

Work through this list before the site goes public:

1. The registered owner's selling instructions are in place and an auctioneer or selling agent is appointed.
2. The selling solicitor has approved the occupation wording and the summary of the parties' positions.
3. The valuation and planning appraisal are current, and the planning status panel has been re-checked.
4. The guide price, date, fees, VAT, deposit and completion terms are confirmed by the auctioneer.
5. Every **To confirm** marker is replaced (`grep -n 'class="todo"' *.html` returns nothing).
6. Photos are confirmed as unedited and accurate, or replaced with the agent's professional photography. The two current photos appear heavily processed.
7. The privacy notice is completed by the agent, and `AGENT_EMAIL` is set.
8. The draft banners in `index.html` and `privacy.html` are deleted.
9. `<meta name="robots" content="noindex, nofollow">` is removed from both pages.
10. The Cloudflare Access gate is removed (see DEPLOY.md, "Going public").

## Running locally

```
python3 -m http.server 8000
# then visit http://localhost:8000/
```
