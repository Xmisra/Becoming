import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const location = useLocation();
  const { authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f7f8fb] p-6">
        <div className="mx-auto mt-24 max-w-md">
          <Loading text="Restoring your session..." />
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}

export default ProtectedRoute;
