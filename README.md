# React TypeScript Project

This project is a React application built with TypeScript and several powerful libraries to enhance development and user experience.

## Features

- **TypeScript**: Static typing for JavaScript to ensure better code quality and maintainability.
- **Redux Toolkit**: State management made simple and efficient.
- **React Router**: For managing routes in the application.
- **React Markdown**: Render Markdown content effortlessly.
- **React Icons**: Ready-to-use icons for UI components.
- **React Select**: A flexible and customizable select/dropdown library.
- **UUID**: For generating unique identifiers.

---

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Asyafak/note-app.git
   cd note-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn run dev
   ```

The application will be available at `http://localhost:5174`.

---

## Scripts

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:5174] (http://localhost:5174) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for best performance.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run lint`

Runs ESLint to check code quality.

---

## Dependencies

### Core Dependencies

- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **typescript**: ^5.6.2

### State Management

- **@reduxjs/toolkit**: ^2.5.0
- **react-redux**: ^9.2.0

### Routing

- **react-router-dom**: ^7.1.1

### Utilities

- **uuid**: ^11.0.3

### UI Enhancements

- **react-icons**: ^5.4.0
- **react-select**: ^5.9.0
- **react-markdown**: ^9.0.1

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Select](https://react-select.com/)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
