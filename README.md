# EXISTERA UI

> Simple React component library built for consistency, accessibility, and scalable applications.

![License](https://img.shields.io/badge/License-Free_to_Use-blue)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## Overview

EXISTERA UI is a **free React component library and design system** for building modern web applications.

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
