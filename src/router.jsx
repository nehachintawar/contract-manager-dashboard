import { createBrowserRouter } from "react-router";

import { Loader } from "lucide-react";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    hydrateFallbackElement: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader size={48} strokeWidth={2} className="animate-spin" />
        <span style={{ marginTop: 16, fontSize: 18, color: "#555" }}>
          Loading, please wait...
        </span>
      </div>
    ),
    children: [
      {
        path: "login",
        title: "Login - SaaS Contracts",
        lazy: () => import("./pages/auth/Login"),
      },
    ],
  },
  {
    path: "/",
    title: "Dashboard - SaaS Contracts",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <div>Something went wrong!</div>,
    children: [
      {
        index: true,
        title: "Home - SaaS Contracts",
        lazy: () => import("./pages/dashboard/Dashboard"),
      },
      {
        path: "contracts/:id",
        title: "View Contracts - SaaS Contracts",
        lazy: () => import("./pages/contractDetails/ContractDetails"),
      },
      {
        path: "upload-contracts",
        title: "Contracts - SaaS Contracts",
        lazy: () => import("./pages/uploadContracts/UploadContracts"),
      },
      {
        path: "profile",
        title: "Profile - SaaS Contracts",
        lazy: () => import("./pages/profile/Profile"),
      },
      {
        path: "settings",
        title: "Settings - SaaS Contracts",
        lazy: () => import("./pages/settings/Settings"),
      },
    ],
  },
]);

export default router;
