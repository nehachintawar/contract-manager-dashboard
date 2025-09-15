import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";

import { Loader } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

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

  if (!user)
    return <Navigate to="/auth/login" replace state={{ from: location }} />; // Redirect if not logged in

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
