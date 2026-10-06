/**
 * main.jsx — application entry point
 * Imports global styles once (tokens + resets + base typography).
 * No component logic here — keep it as thin as possible.
 */
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
