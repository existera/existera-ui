# EXISTERA UI

> Modern React component library built for consistency, accessibility, and scalable applications.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## Overview

EXISTERA UI is an open-source React component library and design system for building modern web applications.

It provides a consistent foundation through reusable components, design tokens, themes, utilities, and developer-friendly APIs.

EXISTERA UI is designed with a strong focus on:

- Accessibility
- Consistent user experience
- Developer productivity
- Scalability
- Performance
- Maintainability

---

## Features

- Modern React Components
- Tailwind CSS v4
- TypeScript First
- Theme System
- Dark Mode Support
- Design Tokens
- Accessible Components
- Lightweight Bundle
- Tree Shaking Support
- Responsive Components
- Developer Friendly API

---

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

## Form API

See [Form API and migration](./FORM-API.md) for controlled/uncontrolled values,
callback aliases, native form submission/reset, refs, and date/time formats.

## Documentation

Documentation includes:

- Installation
- Components
- Themes
- Design Tokens
- Best Practices
- Migration Guides
- Changelog

More documentation will be added as the project evolves.

---

## Versioning

EXISTERA UI follows Semantic Versioning.

```text
MAJOR.MINOR.PATCH
```

Example:

```text
2.3.1
```

---

## Contributing

Contributions are welcome.

If you would like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add or update tests where appropriate
5. Submit a pull request

Please follow the project's coding standards and keep changes focused and maintainable.

---

## Issues

Found a bug or have a feature request?

Please open an issue in the project repository with enough information to reproduce the problem or explain the proposed improvement.

---

## Security

If you discover a security vulnerability in EXISTERA UI, please report it privately to the maintainers.

Do not disclose security issues publicly until they have been reviewed and resolved.

---

## Roadmap

Current areas of development include:

- Additional components
- Improved accessibility
- Performance optimizations
- Expanded theme system
- Enhanced documentation
- More customization options
- Improved developer tooling

---

## License

Copyright © 2026 Existera.

EXISTERA UI is released under the MIT License.

You are free to use, modify, distribute, and include EXISTERA UI in personal and commercial projects subject to the terms of the MIT License.

See **LICENSE.md** for the complete license terms.

---

## Third-Party Software

EXISTERA UI includes or depends upon third-party open-source software.

Each dependency remains licensed under its respective license.

See `package.json` for details.

---

## Acknowledgements

EXISTERA UI is built on top of several outstanding open-source projects, including:

- React
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion
- Lucide React

We sincerely thank the maintainers and contributors of these projects.

---

<div align="center">

**Supported by Existera**

Enterprise UI Components for Modern Web Applications.

</div>
Keyboard behavior and manual checks: [ACCESSIBILITY.md](./ACCESSIBILITY.md). Run `npm run dev:accessibility` after building to open the keyboard fixture.
