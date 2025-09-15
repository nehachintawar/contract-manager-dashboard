import { Loader } from "lucide-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthProvider";
import "./index.css";
import router from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<Loader centerToParent />}
      />
    </AuthProvider>
  </StrictMode>
);
