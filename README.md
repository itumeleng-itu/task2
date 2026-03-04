Link Manager (task2)

A small Vite + React + TypeScript app for saving and searching links with basic authentication.

## Features

- Save links with title and URL
- View list of saved links
- Search links using the search bar
- Simple authentication pages (Login / Signup)

## Tech stack

- Vite
- React
- TypeScript
- CSS modules / plain CSS

## Prerequisites

- Node.js 18+ (or current LTS)
- npm, yarn or pnpm

## Install

1. Install dependencies:

```bash
npm install
# or yarn
# yarn
# or pnpm
# pnpm install
```

2. Run development server:

```bash
npm run dev
```

3. Open the app at the address shown by Vite (usually http://localhost:5173).

## Build

```bash
npm run build
# preview the production build
npm run preview
```

## Project structure (important files)

- src/
  - main.tsx — app bootstrap
  - App.tsx — root component
  - components/ — UI components (LinkForm, LinkList, SearchBar, ...)
  - pages/ — LoginPage, SignupPage

## Notes

- This project focuses on the frontend. If you integrate a backend (API, auth, persistence), update the configuration and environment variables accordingly.
- Adjust Node and package manager commands to your local environment.

## Contributing

Contributions and improvements are welcome — open an issue or a PR with a brief description.

## License

Specify a license in the repository if you intend to open-source the project.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
