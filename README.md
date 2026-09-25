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
| `images/sky.jpg` | The background (3200 px wide). |
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
loads them with a version number: `styles.css?v=4`, `script.js?v=4`, and the
background as `images/sky.jpg?v=4` (in `index.html` and `styles.css`).
**Whenever you change `styles.css`, `script.js` or the background, raise that
number everywhere it appears** (e.g. to `?v=5`). Changes to `index.html` alone
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

- Background photo: [Linus Belanger on Unsplash](https://unsplash.com/photos/fluffy-white-clouds-contrast-against-a-dark-blue-sky-3M_qkybLtq4)
  (Unsplash License, free to use). Built from a 3840 px copy: sky extended
  upward, sensor noise smoothed in the plain sky, colour-graded to match the
  Cerita Nyata trifold.
- Font: [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts).
- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis),
  loaded from jsDelivr. If it fails to load, the site still works with normal
  scrolling.
- Accessibility: visitors who have "reduce motion" turned on see everything
  without animation; all content is still shown if JavaScript is off; the
  split-letter headings are read normally by screen readers.
