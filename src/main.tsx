import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./index.css";

const saved = localStorage.getItem("theme");

if (saved === "dark") {
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);