import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./main.css";
import { authStore } from "./store/authStore/auth";

authStore.getProfile();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <App />
    </div>
  </StrictMode>,
);
