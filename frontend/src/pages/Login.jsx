import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { getApiError } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authLoading, isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (err) {
      setError(getApiError(err, "Login failed. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue versioning your journey."
      footerText="New here?"
      footerLink="/signup"
      footerLinkText="Create an account"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Alert message={error} />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          required
        />
        <Button className="w-full" loading={loading} type="submit">
          Log in
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
