# Petros Sisay Gelan — Professional Developer Portfolio

A modern, production-quality personal portfolio built with React and Vite. Dark-first premium design with full dark/light mode, responsive layout, interactive command palette, project showcase, and contact form.

---

## 🚀 Tech Stack

- **React 19** — Component-based UI architecture
- **Vite 8** — Ultra-fast build tooling and dev server
- **CSS Modules** — Scoped, component-level styling
- **CSS Custom Properties** — Centralized design tokens
- **Lucide React** — Consistent icon library

---

## 📂 Project Structure

```
src/
├── App.jsx                         ← Main application composition
├── main.jsx                        ← React entry point
├── components/
│   ├── common/
│   │   ├── Icons.jsx               ← Custom SVG icons (GithubIcon, LinkedinIcon)
│   │   ├── Toast.jsx               ← Toast notification component
│   │   └── Toast.module.css
│   ├── interactive/
│   │   ├── CommandPalette.jsx      ← Ctrl+K keyboard navigation command palette
│   │   └── CommandPalette.module.css
│   ├── layout/
│   │   ├── Navbar.jsx              ← Sticky responsive navigation bar
│   │   ├── Navbar.module.css
│   │   ├── Footer.jsx              ← Site footer
│   │   ├── Footer.module.css
│   │   ├── ScrollProgress.jsx      ← Top scroll progress indicator
│   │   └── ScrollProgress.module.css
│   └── sections/
│       ├── Hero.jsx / Hero.module.css
│       ├── About.jsx / About.module.css
│       ├── Skills.jsx / Skills.module.css
│       ├── Projects.jsx / Projects.module.css
│       ├── Journey.jsx / Journey.module.css
│       ├── Education.jsx / Education.module.css
│       ├── Services.jsx / Services.module.css
│       ├── GithubActivity.jsx / GithubActivity.module.css
│       └── Contact.jsx / Contact.module.css
├── data/
│   ├── config.js                   ← ⭐ ALL personal info (name, links, bio, etc.)
│   ├── projects.js                 ← ⭐ All project data
│   ├── skills.js                   ← ⭐ Technical skill categories
│   ├── journey.js                  ← ⭐ Timeline/milestone data
│   └── services.js                 ← ⭐ Services offered
├── hooks/
│   ├── useTheme.js                 ← Dark/light mode with localStorage persistence
│   ├── useScrollSpy.js             ← Active section detection for navbar
│   ├── useIntersection.js          ← Scroll-reveal animations
│   └── useCommandPalette.js        ← Ctrl+K keyboard shortcut handler
└── styles/
    ├── variables.css               ← ⭐ Design tokens (colors, spacing, radii, shadows)
    ├── globals.css                 ← Reset, utility classes, section helpers
    └── animations.css              ← Keyframes and reveal animation classes
```

---

## ⚙️ Setup & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Adding Your Personal Assets

### 1. CV / Resume PDF
**Place your resume PDF at:**
```
public/cv.pdf
```
The "Download CV" and "View CV" buttons will automatically use this file.

### 2. Profile Photo
**Place your profile image at:**
```
public/profile.jpg
```
Recommended: Square image, minimum 400×400px. The About section will use this.

### 3. Project Screenshots
To add screenshots for projects, place them in:
```
public/projects/
  ace-meklit.jpg
  apple-website.jpg
  group-chat-app.jpg
  student-registration.jpg
  ...
```
Then in `src/data/projects.js`, update the `image` field:
```js
image: '/projects/ace-meklit.jpg',
```

---

## 🎨 Customizing Your Information

### Update Personal Info
Edit `src/data/config.js` to change:
- Your name, title, bio, and tagline
- Email, GitHub, LinkedIn, Telegram links
- University and location details
- CV file path

### Update Projects
Edit `src/data/projects.js` to:
- Add new projects (copy the object template)
- Update GitHub and live demo URLs
- Mark projects as `featured: true` to highlight them

### Update Skills
Edit `src/data/skills.js` to add or remove technologies and adjust proficiency status.

### Update Journey/Timeline
Edit `src/data/journey.js` to add or update milestones.

### Update Services
Edit `src/data/services.js` to update what you offer.

---

## 📧 Contact Form Integration

The contact form includes full client-side validation. To enable real email delivery:

1. Set up a service such as **Formspree**, **Web3Forms**, or **EmailJS**
2. In `src/data/config.js`, update:
   ```js
   contactEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
   ```
3. The form will POST JSON to this endpoint when a user submits.

When `contactEndpoint` is empty, the form simulates submission and shows a success toast.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` / `Cmd + K` | Open command palette |
| `Escape` | Close command palette / modals |
| `Tab` | Navigate interactive elements |

---

## 🌙 Theme System

- **Default**: Dark mode
- Preference saved to `localStorage`
- Respects `prefers-color-scheme` as fallback
- Toggle via Navbar button or Command Palette

---

## ♿ Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on all interactive elements
- Keyboard navigable modals and menus
- Visible `:focus-visible` states
- `prefers-reduced-motion` support
- Sufficient color contrast in both themes

---

## 📦 Deployment

This is a standard Vite SPA — deploy to:
- **Vercel** (recommended): `npx vercel` or connect GitHub repo
- **Netlify**: Drag and drop the `/dist` folder or connect GitHub
- **GitHub Pages**: Build and push `/dist` to `gh-pages` branch

Build output: `dist/`

---

*Built by Petros Sisay Gelan — Software Engineering Student & Full-Stack Developer*
*Adama Science and Technology University (ASTU), Ethiopia*
