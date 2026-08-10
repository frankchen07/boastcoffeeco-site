# Editing site content

These files hold the text shown on the site. Each one maps to a page:

| File | Page |
|---|---|
| `home.json` | Home page (services, nitro, espresso sections) |
| `visit.json` | Visit page hours |
| `our-story.json` | Our Story page |
| `wholesale.json` | Wholesale page intro text |
| `forms.json` | Dropdown options on the contact and wholesale forms |
| `nav.json` | Header menu links and footer text/links |

## How to edit

1. Open the file on GitHub.com (not your computer).
2. Click the pencil icon (top right of the file) to edit.
3. Change only the text **between the quotes**. Don't remove or add any quotes, commas, or brackets — that's what holds the file together.
4. Scroll down, add a short message describing your change, click **Commit changes**.
5. The site rebuilds automatically — your change goes live in a couple of minutes.

**Example — safe edit:**

```
"title": "Full Service",
```
becomes
```
"title": "Full-Service Delivery",
```

Only the text inside the quotes changed. The quotes, colon, and comma are untouched.

## Images

Some files reference image filenames (e.g. `"/boast-coffee-bags-1.jpg"`). To swap an image, upload a new file to the `public/` folder with the **exact same filename** via GitHub's "Add file → Upload files" — this is a bit more involved than a text edit, so ask for help the first time.

## If something breaks

If the site fails to update after a commit, the JSON was probably broken by the edit (a missing comma or quote). Undo the commit on GitHub (or ask for help) — the live site stays on the last working version until a new build succeeds, so a bad edit can't take the site down.
