<p align="center">
  <img src="./public/existera-ui-dark.svg" alt="Existera UI logo" width="320" />
</p>

<p align="center">
  A React component library and design system for consistent, accessible interfaces.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript" alt="TypeScript 6.x" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Active development" />
</p>

---

## Overview

EXISTERA UI is an **open-source React component library and design system** for building modern web applications.

It provides a consistent foundation through reusable components, design tokens, themes, utilities, and developer-friendly APIs.

EXISTERA UI is designed with a strong focus on:

- Accessibility
- Consistent user experience
- Developer productivity
- Scalability
- Performance
- Maintainability

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion
- Lucide React

---

## Installation

Install EXISTERA UI from npm:

```bash
npm install @existera/ui
```

Import the precompiled stylesheet once in your application entry point:

```tsx
import "@existera/ui/style.css";
```

The stylesheet includes the component utilities, light/dark theme tokens, and
the Tailwind base reset used by the documentation. You do not need to install
or configure Tailwind to use the components. JavaScript imports do not inject CSS.

If your application already uses Tailwind, import this stylesheet once alongside
your application CSS; do not scan this package to regenerate its component styles.
Load application overrides after the package stylesheet. The existing base styles
apply to the document, including the page background and form controls.

Typography uses the application's `--font-sans` token, with a system-font default.
The documentation loads Geist separately; the package does not download fonts.

To activate the included dark palette, set `data-theme="dark"` on the root
`<html>` element, or use the exported `useExTheme` hook.

---

## Requirements

- React 19+
- TypeScript 6+
- Tailwind CSS v4 is only required when developing this library, not when consuming it.

---

## Usage

```tsx
import { ExButton } from "@existera/ui";

export default function App() {
  return (
    <ExButton color="primary">
      Button
    </ExButton>
  );
}
```

---

## License

EXISTERA UI is open-source software licensed under the [MIT License](./LICENSE.md).

You may use, copy, modify, merge, publish, distribute, sublicense, and sell copies
of the software, including in personal and commercial projects. Include the
copyright notice and MIT permission notice in all copies or substantial portions
of the software. The software is provided without warranty.

Third-party dependencies retain their own licenses and copyright notices.
See [Third-Party Notices](./NOTICE.md).
