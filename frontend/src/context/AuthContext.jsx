import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser, logoutUser, signupUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function refreshUser() {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
      return response.data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setAuthLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);

      if (!["/login", "/signup"].includes(location.pathname)) {
        navigate("/login", {
          replace: true,
          state: { from: location.pathname },
        });
      }
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [location.pathname, navigate]);

  async function login(formData) {
    await loginUser(formData);
    return refreshUser();
  }

  async function signup(formData) {
    await signupUser(formData);
    return login({
      email: formData.email,
      password: formData.password,
    });
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      navigate("/login", { replace: true });
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authLoading,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
