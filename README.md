# Cerita Nyata

Website for **Cerita Nyata**, a student-founded podcast and short film
initiative (IB CAS project). Plain HTML, CSS and JavaScript: no build step,
nothing to install.

The look: the teal-and-cream cloud sky from the Cerita Nyata trifold, with
thin ink lines that **draw themselves in as you scroll**. Frames trace their
cut-corner outlines, hairlines slice across, headings reveal letter by letter,
and the lines joining each section (and the CAS journey timeline) grow as you
scroll past them. This happens every time you reach something, scrolling down
or back up: once a box has left the screen it resets, so it draws in again.

## Files

| File | What it is |
|---|---|
| `index.html` | All the content. Every section of the page lives here. |
| `styles.css` | Colours, fonts, layout, animations. Colours and sizes are at the top (`:root`). |
| `script.js` | Makes it move: builds the nav, draws the frames, reveals text, scroll effects. You shouldn't need to edit it. |
| `images/sky.webp` | The background (3600 px wide). `images/sky.jpg` is a fallback for older browsers. |
| `images/cloud-01.webp` … `cloud-14.webp` | The clouds that drift in front of the page. Each one is a different real cloud. |
| `images/team/` | Teammate photos (see **Team panels** below). |

## Editing text

Open `index.html` and change the words between the tags. Each section is
marked with a comment like `<!-- 02 VALUES -->`.

## Adding a section

At the bottom of `<main>` in `index.html` there is a commented-out
**TEMPLATE** block. Copy it (without the `<!--` and `-->`), paste it where
you want the section, then:

1. Change `id="team"` to a unique id (lowercase, no spaces).
2. Change `data-nav="Team"` to the label you want in the nav bar.
3. Write your heading and text.

That's it. The section is added to the nav bar and the mobile menu
automatically, and numbered automatically (01, 02, 03…). Put a
`<div class="connector" data-scrub aria-hidden="true"><span></span></div>`
between sections to get the drawn line that joins them.

Building blocks you can reuse inside any section (copy them from the existing
sections):

| Block | Example in | What it looks like |
|---|---|---|
| `.split` | About | Two columns with a line between them |
| `.team` | Team | Tall colour panels, one per person |
| `.columns` | Values | Three numbered columns with lines between them |
| `.journey` | CAS Journey | Timeline that fills in as you scroll |
| `.outcomes` | Outcomes | Rows separated by lines |
| `.cards` | Stories | Framed cards (turn an `<article>` into `<a href="...">` to link it) |
| `.actions` + `.btn` | Contact | Framed buttons |
| `.contact-form` | Contact | Message form (see **Contact form** below) |

Animation attributes you can put on anything:

- `data-frame` draws a cut-corner outline around the element (`data-frame="10"` sets the corner size).
- `data-split="chars"` reveals the text letter by letter (use on headings).
- `data-split="words"` slides the text up word by word (use on paragraphs).
- `data-reveal` fades the element up.

## Team panels

The Team section is a strip of tall panels, one per person, each with its
own colour and moving effect. Each person is one `<article class="member">`
in `index.html`:

```html
<article class="member" data-fx="bubbles" data-photo="" style="--c1: #3f8d91; --c2: #a8ded8; --c3: #133a40">
  <h3 class="member__name">Eshan</h3>
  <p class="member__role"></p>
</article>
```

- **Photo:** put it in `images/team/` and set `data-photo="images/team/eshan.jpg"`.
  Tall photos work best. With no photo, the panel shows a big initial.
- **Role:** write it in `member__role`, e.g. `Host`. Empty roles are hidden.
- **Colours:** `--c1` main, `--c2` light, `--c3` dark.
- **Effect:** `data-fx` can be `embers`, `petals`, `bubbles`, `leaves`, `sparks`,
  or `echoes` (sound-wave rings, Ameer's).
- **Blank panel:** `class="member member--empty"` gives a plain placeholder panel.

On a computer, the panel under the mouse widens. On phones and tablets, all six show at once in a grid.

## 3D clouds

The background moves in layers so the page feels deep:
- the sky slowly drifts down into the clouds and zooms in as you scroll;
- on a computer, the layers tilt slightly as you move the mouse;
- small clouds (`.fore` in `index.html`) drift **in front of** the page, each
  moving a bit faster than the page scrolls. Faster ones are brighter and look
  closer; slower ones are fainter and look further away.

Each front cloud is an `<img class="wisp">` with:
- `data-at`: where down the page it passes the middle of the screen (0 = top, 1 = bottom)
- `data-x`: where across the screen its middle sits, in % of the width
  (under 0 or over 100 makes it hang off the edge)
- `data-size`: width, in % of the screen width (phones draw them 1.6 times as big)
- `data-speed`: how fast it moves compared with the page, about 1.2 to 1.8

Delete the whole `<div class="fore">` to switch the front clouds off. In newer
browsers the browser itself moves the layers in step with scrolling; older
browsers use `script.js`. Visitors with "reduce motion" turned on don't get
any of this movement.

The team panels' particles and flowing light start only after each panel has
finished sliding in, and phones get a lighter version (half the particles,
no glow, swooshes fade in instead of drawing), so older phones don't stutter
when the team section loads.

## Contact form

The **Send a message** button in the Contact section (and **Share your
story** at the top of the page) opens a pop-up with the message form. Any link
to `#message` opens it. It closes with its Close button, the Esc key, or a
click outside it.

The form is sent by [Web3Forms](https://web3forms.com) to the inbox your
access key was created with. The key is the `access_key` field in the form in `index.html`. It is
meant to be public (Web3Forms is designed to be used from web pages, and the
key can only send messages to your inbox), so it's fine that it's in this
repo. If it ever gets abused for spam, make a new key in your Web3Forms
dashboard and replace it there. A hidden `botcheck` box catches most spam bots.

Messages arrive with the subject "New message from the Cerita Nyata website";
change the `subject` field to change that.

## Before you share it

- **Test the form:** send yourself one message from the live site to check it
  arrives.
- **Stories:** when an episode or film is out, update its card and link it.
- **CAS journey / outcomes:** the text describes the plan for each stage. As
  you complete stages, rewrite them with what you actually did. That makes
  this page useful evidence for your CAS portfolio.

## Updating the live site

GitHub Pages tells browsers to keep each file for up to 10 minutes. So that
visitors never get a new page with an old script or stylesheet, `index.html`
loads them with a version number: `styles.css?v=8`, `script.js?v=8`, and the
images as `images/sky.webp?v=8` etc. (in `index.html` and `styles.css`).
**Whenever you change `styles.css`, `script.js` or the background, raise that
number everywhere it appears** (e.g. to `?v=9`). Changes to `index.html` alone
don't need it. If you still see an old version, hard-refresh with
Ctrl+Shift+R (Cmd+Shift+R on a Mac).

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8080` in this
folder and visit `http://localhost:8080`.

## Publish with GitHub Pages

On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
branch → Branch: `main`, folder: `/ (root)` → Save.** The site goes live at
`https://<username>.github.io/<repo>/` within a minute or two.

## Credits & notes

- Background photo: [Masum Bin Zafar on Unsplash](https://unsplash.com/photos/blue-sky-filled-with-scattered-white-cumulus-clouds-rdtPPy49BSg)
  (Unsplash License, free to use): scattered small cumulus, recoloured to the
  Cerita Nyata trifold's cyan sky and cream clouds, with clear sky added on top.
- Front clouds: each is a single cloud cut out of one of these Unsplash photos
  (Unsplash License) and recoloured to match:
  [arrow cloud](https://unsplash.com/photos/a-cloud-shaped-like-an-arrow-in-a-blue-sky-ruOG4S8JbnQ),
  [single fluffy cloud](https://unsplash.com/photos/a-single-fluffy-cloud-against-a-clear-blue-sky-G4TdiC2dzsQ),
  [white cloud on deep blue](https://unsplash.com/photos/a-single-white-cloud-against-a-deep-blue-sky-GdPAjMyuWJ8),
  [fluffy clouds in clear sky](https://unsplash.com/photos/fluffy-white-clouds-in-a-clear-blue-sky-NxvEswaIKJc),
  [blue sky with white clouds](https://unsplash.com/photos/a-blue-sky-with-white-clouds-_YCQqc4TCyA),
  [cloudy sky at daytime](https://unsplash.com/photos/cloudy-sky-at-daytime-v9bnfMCyKbg).
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts).
- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis),
  loaded from jsDelivr. If it fails to load, the site still works with normal
  scrolling.
- Accessibility: visitors who have "reduce motion" turned on see everything
  without animation; all content is still shown if JavaScript is off; the
  split-letter headings are read normally by screen readers.
