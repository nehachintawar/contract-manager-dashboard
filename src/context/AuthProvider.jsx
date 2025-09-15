import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../services/api";
import { endpoints } from "../services/urls";
import { isTokenExpired } from "../utils/authUtils";
import { AuthProviderContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const storedUser = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");

      if (storedUser && accessToken) {
        try {
          if (isTokenExpired(accessToken)) {
            await api.post(endpoints.refresh, {
              refreshToken: localStorage.getItem("refreshToken"),
            });

            const res = await api.get(endpoints.profile);
            setUserDetails(res.data);
            setUser(storedUser);
          } else {
            const res = await api.get(endpoints.profile);
            setUserDetails(res.data);
          }
          setUser(storedUser);
        } catch (error) {
          localStorage.removeItem("userId");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setServerDown(true);
          console.error("Error fetching user details:", error);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (userData, accessToken, refreshToken) => {
    setUser(userData);
    try {
      const res = await api.get(endpoints.profile, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUserDetails(res.data);
      localStorage.setItem("userId", userData);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setServerDown(true);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/auth/login";
  };

  return (
    <AuthProviderContext.Provider
      value={{ user, userDetails, login, logout, loading, serverDown }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
