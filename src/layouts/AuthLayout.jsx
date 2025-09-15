import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function AuthLayout() {
  const { loading, user } = useAuth();

  if (loading)
    return (
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
    );

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }
  return <Outlet />;
}
