# Melissa Smith Photography

A static photography portfolio website built with native HTML5, CSS, and JavaScript — no frameworks, no build step, no dependencies. Designed to be hosted from an AWS S3 bucket.

## Features

- **Home page** with a full-screen hero slideshow, a horizontally scrolling Featured Work marquee, an about section, and a highlighted-images carousel
- **Album pages** for every gallery session with a masonry gallery and click-to-enlarge lightbox (the Johnson Family, Ella's Senior Portraits, and Viking Company Holiday Party share their featured pages)
- **Gallery page** organized by session type (Family, Senior, Events, Maternity, Real Estate) with client-side filtering; each session title links to its album page showing the full set of photos
- **Pricing page** with session packages and detailed notes
- **What to Expect page** walking clients through the booking process, plus tips and a FAQ
- **Contact section** with email (`contact@melissasmithphotography.com`), phone, and social links
- Locally bundled fonts (Cormorant Garamond headings + Nunito Sans body) — no CDN dependencies
- Fully responsive down to 480px with a mobile hamburger menu

## Tech Stack

- Plain HTML5, CSS3, and vanilla JavaScript (ES5-compatible syntax)
- No external libraries, no CDN dependencies
- All images are stored locally under `images/`

## Project Structure

```
.
├── index.html                  # Home page
├── gallery.html                # Portfolio organized by session
├── pricing.html                # Price sheet
├── expectations.html           # Session expectations + FAQ
├── the-johnson-family.html     # Album page (featured session)
├── ellas-senior-portraits.html # Album page (featured session)
├── viking-company-holiday-party.html # Album page (featured session)
├── the-park-family.html        # Album page
├── the-gonska-liu-family-maternity.html # Album page
├── marcus-grad-portraits.html  # Album page
├── simple-city-hall-elopement.html # Album page
├── the-beaumont-family.html    # Album page
├── commercial-real-estate.html # Album page
├── css/
│   └── style.css               # All styling (single file)
├── js/
│   └── main.js                 # All behavior (single file)
├── fonts/                      # Local woff2 fonts (@font-face in style.css)
└── images/
    ├── hero/                   # Homepage hero slideshow
    ├── about/                  # Photographer portrait
    ├── featured/               # Featured Work thumbnails
    ├── carousel/               # Homepage highlights carousel
    ├── gallery/                # Gallery page, split by session
    │   ├── johnson/
    │   ├── emily/
    │   ├── viking-company-holiday-party/
    │   ├── park-family/
    │   ├── gonska-maternity/
    │   ├── marcus/
    │   ├── elopement/
    │   ├── beaumont-maternity/
    │   └── real-estate/
    ├── johnson-family/         # Album page images (hero, story, 1-8)
    ├── emily-senior/           # Album page images
    └── viking-company-holiday-party/   # Album page images
```

## Running Locally

Because the site uses `file://`-relative paths, serve it over HTTP:

```bash
cd "path/to/project"
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

## Replacing Stock Images

The site currently uses stock photos as placeholders. Each page references images by path, so swapping in real photos is straightforward:

1. **Replace in place** — drop a real photo into the same file path (e.g. `images/johnson-family/hero.jpg`) and keep the filename.
2. **Change the path** — update the `background-image: url('...')` values in the HTML files to point at your own files.

> Note: every image is set via CSS `background-image` inside a `style` attribute (e.g. `<div class="session-photo" style="background-image: url('images/gallery/johnson/1.jpg');"></div>`). The container classes apply `background-size: cover` and `background-position: center`, so any aspect ratio will crop cleanly.

## Behavior & Interactions (all in `js/main.js`)

- **Hero slideshow** — cross-fades every 6 seconds
- **Featured marquee** — infinite horizontal scroll, pauses on hover
- **Highlights carousel** — auto-advances every 5 seconds, prev/next controls, dot navigation, pauses on hover
- **Gallery filters** — show/hide session cards by category
- **Lightbox** — enlarge gallery photos; close via ×, backdrop click, or Escape

## Deploying to AWS S3

1. Create an S3 bucket (name must be globally unique).
2. In the bucket's **Properties**, enable **Static website hosting** and set the index document to `index.html`.
3. In **Permissions**, add a bucket policy allowing public reads:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
       }
     ]
   }
   ```

4. Upload the entire project directory (`.html`, `css/`, `js/`, `images/`) preserving the folder structure.
5. The site is publicly reachable at the endpoint shown under **Static website hosting** (e.g. `http://YOUR-BUCKET.s3-website-us-west-2.amazonaws.com`).

### Going live with a custom domain (optional)

- Point your domain at the bucket via Route 53 (Alias record to the S3 website endpoint).
- For HTTPS, add CloudFront in front of the bucket and attach an ACM certificate. Note: S3's website endpoint does not support HTTPS. For a free HTTPS setup without CloudFront, use another static host.

## Customization

- **Business info** — phone, email, and location are in the contact section of `index.html`.
- **Name/branding** — the logo, titles, and footer say "Melissa Smith Photography"; update these strings in the `<header>`/`<footer>` of each page.
- **Session content** — session names, dates, and descriptions live in `gallery.html` and the event pages.
- **Pricing** — package prices and notes are in `pricing.html`.
- **Colors/fonts** — CSS custom properties at the top of `css/style.css` control the palette and typefaces.

## License

All content is placeholder/example data. Replace images, names, and copy with real material before going live.