import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);
