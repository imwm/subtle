# Subtle.so - PRD for LLM Agents

## 1. Overview

`subtle.so` is a personal blog focused on technology, AI, startups, and the future of work. The central theme explores the implications of commoditized intelligence. It serves as a platform for sharing thoughts, experiments, and observations in these areas.

## 2. Technology Stack & Architecture

- **Frontend:** Vanilla HTML, CSS, and JavaScript.
- **Styling:** Tailwind CSS (via CDN and custom configuration in `tailwind.config.js`) is the primary styling method. Additional custom styles are in `styles/main.css`.
- **Structure:**
  - Static site with individual HTML files for each blog post (e.g., `post-title.html`).
  - `index.html` serves as the main feed, listing posts with summaries.
  - `new-post-template.html` is the template for creating new blog posts.
  - Reusable UI elements (header, footer, intro box) are stored in the `components/` directory and included client-side using a custom script (`scripts/components.js`) that looks for the `include-html` attribute.
- **JavaScript:** Vanilla JS is used for interactivity, including:
  - Dark mode toggle (`scripts/darkMode.js`)
  - Client-side HTML includes (`scripts/components.js`)
  - Toast notifications (`scripts/toast.js`)
  - Keyboard shortcuts (`scripts/keyboard-shortcuts.js`)
- **Assets:** Static assets like images and favicons are in the `public/` directory.
- **Deployment:** Hosted statically (likely via Vercel, based on `vercel.json`).

## 3. Design Principles & Goals

- **Simplicity:** Maintain a clean, minimal, text-focused design. Avoid unnecessary complexity in code and UI.
- **Performance:** Keep the site fast and lightweight. Prioritize static generation and minimal JavaScript.
- **Readability:** Ensure content is easy to read on various devices, with good typography and contrast (supports dark mode).
- **Maintainability:** Use clear code conventions and leverage TailwindCSS for consistent styling. Component-based structure aids reuse.
- **LLM Focus:** The content often discusses LLMs, and the site itself might be maintained or augmented by LLMs.

## 4. Key Components & Files

- `index.html`: Main blog feed page.
- `*.html` (root): Individual blog post pages.
- `new-post-template.html`: Template for new posts.
- `components/`: Directory containing reusable HTML snippets (header, footer, intro-box).
- `styles/`: Contains CSS files (`main.css`, `tailwind.js`).
- `scripts/`: Contains JavaScript files for dynamic behavior.
- `public/`: Static assets (images, favicon).
- `tailwind.config.js`: Tailwind CSS configuration.

## 5. Guidelines for LLM Agents

- **Creating New Posts:** Copy `new-post-template.html`, rename it appropriately (e.g., `my-new-post-title.html`), and fill in the `[Date]`, `[Title]`, and `[Content]` placeholders. Add a new entry to `index.html` linking to the new post, following the existing pattern (most recent post first).
- **Modifying Styles:** Primarily use Tailwind utility classes. For significant custom styles, modify `styles/main.css`. Remember to consider both light and dark modes.
- **Adding Functionality:** Use vanilla JavaScript in the `scripts/` directory. If adding a reusable UI element, create a new file in `components/` and include it where needed using the `include-html` attribute.
- **Consistency:** Follow the existing structure and conventions. Refer to existing posts and components as examples.
