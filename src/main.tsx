import { StrictMode } from "react";
import { LazyMotion, domMax } from "motion/react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <LazyMotion features={domMax}>
      <App />
    </LazyMotion>
  </StrictMode>,
);
