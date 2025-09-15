import { useContext } from "react";

import { AuthProviderContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (!context) throw new Error("use Auth must be used within an AuthProvider");
  return context;
};
