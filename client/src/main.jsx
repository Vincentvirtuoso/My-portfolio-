import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routes from "./router/index.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { ThemeProvider } from "./components/layout/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <ThemeProvider>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  </StrictMode>,
);
