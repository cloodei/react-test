import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
