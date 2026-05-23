import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Explore from "./pages/Explore.jsx";
import JourneyTimeline from "./pages/JourneyTimeline.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/explore"} replace />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/journey/:id" element={<JourneyTimeline />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
