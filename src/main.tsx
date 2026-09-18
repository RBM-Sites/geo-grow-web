import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

// Prerendered pages (scripts/prerender.mjs) ship with the markup already in
// #root — hydrate over it. Anything served from the bare SPA shell (unknown
// routes) still renders from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
