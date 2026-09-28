# Riverbank, Westcott — sealed bid website

A small static website that presents Riverbank, Westcott to property
investors as an occupied commercial freehold, with the occupation dispute
and planning status disclosed clearly. It is based on the
*Riverbank Auction Website Framework* brief (27 September 2026).

**Status: draft for review.** It isn't live sale particulars. No auction
instruction, guide price, reserve or sale date has been confirmed yet.
Anything still waiting on verified information shows as an amber
**To confirm** marker.

## Files

- `index.html` is the public property page. It has the key disclosures,
  the reasons to bid, the process (fees, deposit, steps) and a
  document list that shows which documents are for approved bidders only.
- `register.html` is the bidder application form. It builds an email to
  the agent, who verifies ID and proof of funds.
- `terms.html` holds the **draft** sealed bid terms, which the solicitor must approve.
- `privacy.html` covers the handling of registration, AML and proof-of-funds data.
- `data-room/` is the approved-bidder area, gated by Cloudflare Access (DEPLOY.md,
  Step 3b). It holds `index.html` (the bid pack), `bid-form.html` (a printable
  sealed bid form) and `files/`, where the documents go.
- `assets/style.css` holds the styles. `assets/main.js` runs the navigation,
  form validation and the email that each form builds.
- `assets/img/` holds photos (see `assets/img/README.md`).

## How the sealed bid process works

1. The applicant fills in `register.html`, which emails the agent.
2. The agent verifies the applicant's ID, AML and **proof of funds**, and
   takes the **£200 non-refundable registration fee** and the **£1,000
   refundable bid deposit** into the agent's client account.
3. The agent adds the bidder's email to the data room Access policy.
4. The bidder downloads the bid pack and submits a sealed bid on the bid
   form by the closing date.

The website never takes payments or stores bids.

## Editing content

Each page is plain HTML. To fill in a placeholder, search for `todo` and
replace the whole `<span class="todo">…</span>` with the verified text.

- **Registration email:** set `AGENT_EMAIL` at the top of `assets/main.js`.
- **Planning status panel:** update the entries and the "Last checked"
  date whenever the published position changes.
- **Publish a document:** put the file in `docs/`, then in the Documents
  table replace "Available once published" with
  `<a href="docs/filename.pdf" download>Download PDF</a>` and fill in the date.
- **Publish a data room document:** put it in `data-room/files/` and link it
  from the table in `data-room/index.html`.
- **Closing date:** fill in the `To confirm` markers in `index.html`,
  `terms.html`, `data-room/index.html` and `data-room/bid-form.html`.

### Source documents are not stored here

The family's source documents stay out of this repository, and none of them is published as a download. That covers the 2022 valuation report (prepared for a third party), copies of the title register and plan, and the Simon Best Associates planning drawings, which are copyright. The floor plan on the site is our own indicative schematic. Planning records are linked on the council's portal rather than rehosted.

### Wording rules (from the brief)

Keep the headline, images and main copy as cautious as the small print:

- Don't promise vacant possession, a relocation date or residential consent.
- Don't describe the rent as secure or NHS-guaranteed.
- Don't describe the practice as unlawful occupiers.
- Never state or imply that the sale is run by or for Standard Life, or any
  other organisation, unless it has instructed the sale in writing. Don't use
  its name or branding. The title-holder line stays factual and marked
  `To confirm`.
- Always mention the condition 5 use restriction (MO/89/1022) and the withdrawn 2021 application wherever alternative use is discussed.
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
8. The facts taken from the February 2022 valuation inspection are verified: floor areas (new measured survey), EPC (register), flood zones, services.
9. Parking rights and the title boundary are confirmed. The parking area in front of the building is understood to be outside title SY607273.
10. The current Green Belt status is confirmed, and the planning history is checked against the council's records. Replace the general planning-portal links with direct links to MO/89/1022, MO/91/0243 and MO/2021/2158.
11. The seller's identity and authority are confirmed. The last register seen (February 2022) names a trustee company as registered proprietor.
12. The draft banners on every page are deleted.
13. `<meta name="robots" content="noindex, nofollow">` is removed from the public pages. Keep it on `data-room/`.
14. The Cloudflare Access gate is removed (see DEPLOY.md, "Going public").
15. The solicitor approves `terms.html`, including the non-refundable fee
    wording, deposit refund timing and treatment, and whether bids are
    subject to contract.
16. The agent confirms their client account, their AML and proof-of-funds
    process, their secure document upload route, and the address and email
    for sealed bids.
17. The data room Access policy is live (DEPLOY.md, Step 3b), and the
    repository is private, or the documents are hosted by the agent.

## Running locally

```
python3 -m http.server 8000
# then visit http://localhost:8000/
```
