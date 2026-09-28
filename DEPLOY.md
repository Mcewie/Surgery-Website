# Deploying the Riverbank, Westcott site

This guide is written for **non-developers**. Follow each step in order
and the draft site will be online, protected by email login, in roughly
30 minutes. While it is a draft, keep it behind the login. The
"Going public" section at the end explains how to open it up at launch.

You will need:

- A computer with a web browser.
- An email address (for the Cloudflare account).
- 30 minutes.

You will **not** need:

- Any code, command line, or developer tools.
- A credit card. (Cloudflare's free plan covers everything below.)

---

## What you're building

- The website lives in this GitHub repository.
- **Cloudflare Pages** publishes it to a real web URL automatically.
- **Cloudflare Access** stands in front of it: anyone visiting the URL
  must enter their email, get a 6-digit PIN by email, and type the PIN
  to be let in.
- Only emails on your allow-list can get in. Everyone else is blocked.

---

## Step 1 — Create a free Cloudflare account

1. Go to <https://dash.cloudflare.com/sign-up>.
2. Sign up with your email and a strong password.
3. Confirm the email when Cloudflare sends you a verification link.

You don't need to add a domain or a credit card.

---

## Step 2 — Publish the site with Cloudflare Pages

1. In the Cloudflare dashboard sidebar, click **Workers & Pages**.
2. Click **Create application** → **Pages** tab → **Connect to Git**.
3. Click **Connect GitHub** and authorise Cloudflare for your account.
   When asked which repositories to give access to, you can grant
   access to just the `Surgery-Website` repo.
4. Select the **Surgery-Website** repository and click **Begin setup**.
5. Fill in the build settings:
   - **Project name:** `riverbank-westcott` (or anything you like — this
     becomes part of the URL)
   - **Production branch:** `main` *(or whichever branch holds the live
     site — see "About branches" below)*
   - **Framework preset:** *None*
   - **Build command:** *leave blank*
   - **Build output directory:** `/`
6. Click **Save and Deploy**.

In about 60 seconds you'll see a green tick and a URL like:

```
https://riverbank-westcott.pages.dev
```

Click it — the site is live, but currently anyone with the link can
view it. Step 3 fixes that.

### About branches

The sale website is being built on the branch
`claude/dads-new-website-otaph2` and reviewed through a pull request.
Once the pull request is merged into `main`, point Cloudflare Pages at
`main` so the URL stays stable.

---

## Step 3 — Lock the site behind email login (Cloudflare Access)

1. In the Cloudflare dashboard sidebar, click **Zero Trust**. (First
   time only: it asks you to choose a "team name" — pick something
   short like `riverbank`. Choose the **Free** plan when offered. No
   card needed.)
2. In Zero Trust, go to **Access** → **Applications** → **Add an
   application** → **Self-hosted**.
3. Fill in:
   - **Application name:** `Riverbank, Westcott`
   - **Session duration:** `24 hours` (how long someone stays signed
     in before being asked again)
   - **Application domain:** the `*.pages.dev` URL from Step 2, e.g.
     `riverbank-westcott.pages.dev`
4. Click **Next**.
5. **Add a policy:**
   - **Policy name:** `Authorised users`
   - **Action:** `Allow`
   - Under **Configure rules**, choose **Include** → **Emails** and
     paste in each email address that should have access, one per line.
   - Click **Next**.
6. On the **Setup** screen, leave the defaults and click **Add
   application**.

That's it. Now visit the `*.pages.dev` URL in a private/incognito
window. You'll be redirected to a Cloudflare login screen asking for
your email; enter it, get a PIN, type it in, and you reach the site.
Anyone whose email is **not** on your list will be politely refused.

---

## Step 3b — The approved-bidder data room

The bid pack lives in the `data-room/` folder. Only approved bidders may see
it, and a second Cloudflare Access application enforces that.

1. In **Zero Trust** → **Access** → **Applications**, click **Add an
   application** → **Self-hosted**.
2. **Application name:** `Riverbank data room`. For **Application domain**,
   enter your site's domain, and set **Path** to `data-room`.
3. Add a policy called `Approved bidders`, with **Action** set to `Allow`,
   **Include** → **Emails**, and one approved bidder's email per line.
   Also add the agent's own email so they can check the room.
4. Save.

**To approve a bidder** (after the agent has verified their ID and funds
and received the £200 fee and £1,000 deposit), add their email to the
`Approved bidders` policy. They then sign in at `<your site>/data-room/`
with a one-time PIN sent to that email.

**To remove a bidder**, delete their email from the policy. It takes effect
immediately.

While the site is still a draft, the Step 3 gate protects everything,
including the data room. When the main site goes public, **leave this data
room application in place**.

> Data room files are committed to the GitHub repository. Keep the
> repository **private**. Otherwise ask the agent to host the documents in
> their own data room and link to it from `data-room/index.html`.

---

## Step 4 (optional) — Use a custom domain

The `*.pages.dev` URL works forever, but if you own a domain (e.g.
`yourdomain.co.uk`) you can use a friendlier address like
`riverbank.yourdomain.co.uk`.

If/when you want this, tell me the domain and I'll write a separate
short walkthrough — it's an extra ~10 minutes of clicks.

---

## How to add or change content (no code needed)

You don't have to touch the code yourself. The workflow is:

1. **Email or send me what you want changed** in plain English. For
   example:
   - "The auctioneer has confirmed the guide price: …"
   - "Update the planning status panel: the examiner's report was published on …"
   - "Add this EPC to the Documents section."
2. I make the change in the repository and commit it.
3. Cloudflare Pages spots the new commit and re-publishes the site
   within ~60 seconds.
4. Refresh the site in your browser — your change is live.

To add documents, just send me the file (PDF, Word, image, etc.) and
where it should appear.

---

## Adding or removing people

To add someone:

1. Go to **Cloudflare Zero Trust** → **Access** → **Applications**.
2. Click your **Riverbank, Westcott** application.
3. Open the **Policies** tab → click your `Authorised users` policy →
   add their email to the list → **Save**.

To remove someone, do the same but delete their email from the list.
The change takes effect immediately.

---

## Troubleshooting

- **"I'm not getting the PIN email."** Check spam. The sender is
  `noreply@notify.cloudflare.com`. PIN codes expire after 10 minutes —
  request a new one.
- **"The site shows a Cloudflare error page."** Wait 1–2 minutes after
  publishing the access policy; it can take a moment to propagate.
- **"Someone needs to be signed out."** Visit
  `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/logout`
  — that signs you out everywhere.

If anything else goes wrong, take a screenshot and send it over.

---

## Going public at launch

Work through the launch checklist in `README.md` first. The site must
not go public while it still shows **To confirm** markers or the draft banner.

Then remove the login:

1. Go to **Cloudflare Zero Trust** → **Access** → **Applications**.
2. Click the **Riverbank, Westcott** application → **Delete**.

The site is then public at its `*.pages.dev` URL (or your custom domain).
Visit it in a private window to check you aren't asked to log in.
