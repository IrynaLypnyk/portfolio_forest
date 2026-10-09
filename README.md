# Forest Portfolio

My first web development portfolio, originally built in 2017 as a final project for Loftschool's Advanced Web Development course.


🔗[Live demo](https://portfolio-forest-ilypnyk.netlify.app)

## Highlights

- **Responsive multi-page portfolio** with layouts tailored to desktop, tablet, and mobile screens.
- **WebGL water animation and mouse-driven parallax** using GLSL shaders, without an animation library.
- **Motion-aware rendering** with reduced-motion support for the water effect, visibility-based pausing, and a static-image fallback.
- **3D card flip** that reveals the demo login form on the welcome page.
- **Animated SVG graphics** including a loading indicator, scroll-triggered skill charts, and reusable sprite icons.
- **Custom project slider** with looping navigation, synchronized descriptions and links, adjacent-project previews, and fade transitions.
- **Interactive blog navigation** with scrollspy, a fixed desktop sidebar, and a slide-out mobile menu.
- **Animated full-screen navigation** and smooth scrolling between sections.
- **Asynchronous contact form** with browser and PHP validation, submission feedback, and timeout handling; email delivery requires a configured PHP server.
- **Styled Google Maps integration** with a custom animated marker; requires an API key.
- **Reusable Pug components and modular Sass** with a minified esbuild bundle and a local development workflow.
- **Desktop and mobile Playwright tests**, run alongside the production build in GitHub Actions.

See [all features](FEATURES.md) for the full inventory and demo limitations.

## WebGL water animation

The lake on the welcome page comes to life with gentle ripples and mouse-driven parallax. A GLSL fragment shader uses the original photo and an RGB map to control the water area, wave depth, and parallax.

- **Native WebGL:** a small JavaScript runtime without GSAP, Three.js, or other animation libraries.
- **Motion preferences:** reduced-motion settings keep the static background.
- **Graceful fallback:** the CSS image remains available when WebGL is unsupported, textures fail to load, or the graphics context is lost.
- **Rendering on demand:** animation pauses when the background is off screen or the tab is hidden.

The effect runs only on the welcome page; About, My Work, and Blog keep static backgrounds.

The shaders are adapted from the original water distortion demo by Lucas Bebber for Codrops. See [third-party notices](THIRD_PARTY_NOTICES.md).

Explore the [WebGL runtime](src/scripts/components/water.js) and [water shader](src/scripts/shaders/water.frag).

## Stack

- **Frontend:** HTML5, CSS3, JavaScript, jQuery, Pug, Sass (SCSS), normalize.css, and BEM naming.
- **Graphics:** SVG, Canvas, WebGL, and GLSL shaders.
- **Integrations:** Google Maps JavaScript API, CodePen embeds, and the Fetch API for form submissions.
- **Server-side form handling:** PHP with `mail()` (requires a configured PHP host).
- **Build and development:** Node.js, npm, and esbuild.
- **Testing and CI:** Playwright (Chromium) and GitHub Actions.

The current build uses esbuild; Gulp and Webpack mentioned in the course content and skill charts belong to the original learning project. The login and admin demos do not use a database or authentication backend.

## Getting started

Use Node.js 24, as specified in `.nvmrc`. The minimum supported version is Node.js 20.19.

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

Changes in `src/` trigger a rebuild; refresh the browser to see them.

If port 3000 is occupied, stop the previous server with `Ctrl+C` or use another port:

```sh
PORT=3001 npm run dev
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Build, watch source files, and start the local server |
| `npm run build` | Generate the site in `build/` |
| `npm run preview` | Serve the existing `build/` directory |
| `npm run build:pages` | Generate the site in `docs/` for GitHub Pages |
| `npm test` | Run desktop and mobile browser tests |

Build commands replace their output directory. Edit source files in `src/`, not generated files in `build/` or `docs/`.

`build/` is ignored by Git. Commit `docs/` for GitHub Pages. `build:pages` prepares the files but does not publish them.

## Project structure

```text
src/
  templates/   Pug layouts, components, and pages
  styles/      Sass styles
  scripts/     JavaScript components and WebGL shaders
  images/      Images and SVG sprite
  fonts/       Local fonts
  favicons/    Favicons and web manifest
  php/         Contact form handler

scripts/       Build and development server
tests/         Playwright tests
```

## Google Maps

To enable the map, copy `.env.example` to `.env.local` and set your browser API key:

```dotenv
GOOGLE_MAPS_API_KEY=your_browser_key
```

Enable the Maps JavaScript API for the key's Google Cloud project.

Under the key's website restrictions, allow your deployed site and local development URLs:

```text
http://127.0.0.1:3000/*
http://localhost:3000/*
https://irynalypnyk.github.io/*
```

Adjust these URLs if you use a different port or domain.

Restart the development server after changing `.env.local`. Rebuild `docs/` with:

```sh
npm run build:pages
```

before publishing a key change to GitHub Pages.

The local environment file is ignored by Git, but the browser key is included in generated HTML. Restrict it to the required websites and Maps JavaScript API.

The green map style is defined in `src/scripts/components/map.js`. No Map ID or cloud map style is required.

Without a key, the contact details remain visible but the interactive map is disabled.

## Forms

The login form and admin pages are demonstration interfaces without authentication or data storage.

The skill charts and demo testimonials are retained from the original course project.

The contact form requires a PHP server with `mail()` configured and a server environment variable named `CONTACT_EMAIL` containing the recipient address.

Email delivery is unavailable on the local Node.js server and GitHub Pages.

## Tests

Install the Chromium test browser once:

```sh
npx playwright install chromium
```

Then run the suite:

```sh
npm test
```

Tests cover page loading, local assets, layout, navigation, the slider, form feedback, the preloader, and WebGL animation and fallbacks at desktop and mobile sizes.

Screenshots are saved to `test-results/`.

External map services and email delivery are not covered.
