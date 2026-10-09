# Forest Portfolio — Features

A feature inventory of the current project, originally created for Loftschool's Advanced Web Development course in 2017 and subsequently updated with a modern build and WebGL background.

## Animation and visual effects

- **WebGL water animation:** animated lake ripples on the welcome page, rendered with GLSL shaders and an RGB control map.
- **Mouse-driven depth parallax:** the background responds smoothly to pointer movement using depth information from the map.
- **Native graphics runtime:** the water effect uses WebGL directly, without Three.js, GSAP, or other animation libraries.
- **3D card flip:** the welcome card rotates to reveal the demo login form, using CSS perspective, `rotateY`, and hidden back faces.
- **Animated SVG preloader:** wave-shaped paths animate while an image-loading percentage is displayed; the overlay fades out when loading finishes, with a timeout to prevent it from blocking the page indefinitely.
- **Scroll-triggered skill charts:** circular SVG progress indicators fill to preset values with staggered delays and reset when scrolling above the section.
- **Project image transitions:** the custom slider uses fade animations when switching projects.
- **Animated burger menu:** the menu icon transforms into a close icon as the full-screen navigation opens.
- **Smooth scrolling:** arrow controls move between sections or back to the top, and blog navigation scrolls to articles.
- **Hover transitions:** buttons, links, social icons, navigation arrows, and other controls provide visual feedback.

## SVG and visual design

- **Reusable SVG sprite:** social, contact, navigation, and form icons share a sprite referenced through `<use>`.
- **Decorative SVG headings:** large vector graphics sit behind section titles.
- **Scalable section dividers:** SVG polygons create angled transitions between page sections.
- **Custom form controls:** checkboxes and radio buttons retain native inputs with custom visual styling.
- **Local webfonts:** Roboto and Sansus Webissimo are supplied in WOFF and WOFF2 formats.
- **Responsive layouts:** flexible containers, wrapping content, scalable images, and media queries adapt the pages to desktop, tablet, and mobile screens.
- **Consistent forest theme:** shared colors, photography, typography, and decorative elements connect the welcome, About, My Work, and Blog pages.

## Navigation and content

- **Multi-page structure:** dedicated welcome, About, My Work, and Blog pages share layout components and navigation.
- **Custom looping project slider:** previous and next controls cycle through projects and update the main image, description, and destination link together.
- **Adjacent-project previews:** navigation panels display thumbnails of the previous and next projects.
- **Blog scrollspy:** the sidebar highlights the active article as the reader scrolls.
- **Fixed blog sidebar:** desktop article navigation becomes fixed after reaching the article section.
- **Mobile article menu:** a slide-out navigation panel provides access to blog articles on smaller screens.
- **Embedded CodePen example:** a blog article includes an external interactive code example.
- **Contact and social links:** email, phone, social profiles, and a map destination are available as links.
- **Demo testimonials:** a responsive testimonial section retains sample content from the original course project.

## Forms and map integration

- **Asynchronous contact form:** Fetch API submits the name, email, and message without reloading the page.
- **Browser validation:** required fields and an email input provide native client-side validation.
- **PHP request validation:** the handler checks the request method, field types, lengths, and email format before attempting delivery.
- **Submission states and feedback:** the submit button is disabled during a request, requests have a timeout, and success or failure is reported to the visitor.
- **Form reset:** visitors can clear the form manually; a successful submission also resets it.
- **Configurable email delivery:** the PHP handler uses `mail()` and a recipient configured through the `CONTACT_EMAIL` environment variable.
- **Styled Google Maps:** the About page supports an interactive map with a custom green palette and map controls.
- **Custom animated map marker:** a custom marker drops into place and briefly bounces when clicked.
- **Contact details without the map:** contact information remains available when no Google Maps API key is configured.

## Performance and resilience

- **Reduced-motion support for water:** the WebGL effect is replaced by a static background when the visitor requests reduced motion, including when that preference changes during the session.
- **Visibility-aware animation:** water rendering pauses when its host is off screen or the browser tab is hidden.
- **Bounded graphics resolution:** texture size and rendering pixel density are capped to limit GPU work.
- **Responsive canvas sizing:** the canvas tracks its host dimensions through `ResizeObserver` and resize events.
- **Static-image fallback:** the CSS background remains available if WebGL is unsupported, texture loading fails, shader initialization fails, or the graphics context is lost.
- **Graphics cleanup:** animation frames, observers, event listeners, and GPU resources are released when the effect is disposed.
- **Preloader fallback:** failed images count toward completion, a maximum wait prevents an endless overlay, and a `noscript` rule hides it when JavaScript is disabled.
- **Minified assets:** the production build compresses Sass output and bundles and minifies JavaScript.

## Architecture and developer workflow

- **Reusable Pug templates:** shared layouts and mixins generate navigation, social links, skill charts, headers, and footers.
- **Modular Sass:** styles are organized into setup, component, and page modules, with shared variables, mixins, responsive rules, and BEM naming.
- **JavaScript components:** separate modules handle the slider, menu, blog navigation, forms, preloader, skill charts, map, and water effect, with initialization based on the current page.
- **Node.js build pipeline:** Pug renders HTML, Sass compiles CSS, and esbuild bundles JavaScript and shader sources.
- **Local development server:** source changes trigger a rebuild; a browser refresh shows the updated output.
- **Production preview:** a dedicated command serves the existing build locally.
- **GitHub Pages build output:** a build command generates the static site in `docs/`, including `.nojekyll`; publication is a separate step.
- **Environment-based configuration:** the build reads the Google Maps browser key from the environment or `.env.local`.
- **Desktop and mobile browser tests:** Playwright covers page loading, local assets, layout, navigation, slider behavior, form feedback, the preloader, and WebGL behavior and fallbacks.
- **Continuous integration:** GitHub Actions runs the production build and Playwright tests on pushes and pull requests, uploading test results on failure.
- **Basic page metadata:** public pages include titles, description and author metadata, viewport settings, and a set of device-specific favicons and a web manifest.

## Demo scope and integration requirements

- **Login interface:** the welcome page includes a demo login form and the card-flip interaction. Authentication is not connected; the human/robot controls are visual demo elements, not a CAPTCHA service.
- **Admin interfaces:** three demo pages present forms for editing skill values, adding blog posts, and adding projects. They do not persist data or provide a working CMS.
- **Course content:** skill values and testimonials are retained as course-project examples.
- **Google Maps:** an API key with Maps JavaScript API enabled is required for the interactive map.
- **Email delivery:** a PHP server with `mail()` configured and a valid `CONTACT_EMAIL` is required. The local Node.js server and GitHub Pages do not deliver email.
- **External services:** Google Maps and real email delivery are outside the automated test coverage.
- **Water effect attribution:** the shaders are adapted from Lucas Bebber's water distortion demo for Codrops. See [third-party notices](THIRD_PARTY_NOTICES.md). The effect runs only on the welcome page.

See the [README](README.md) for the technology stack, setup instructions, and available commands.
