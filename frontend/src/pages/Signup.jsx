import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { getApiError } from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const { authLoading, isAuthenticated, signup } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
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
      await signup(formData);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getApiError(err, "Signup failed. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start writing your journey and save every meaningful version."
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Log in"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Alert message={error} />
        <Input
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="soumik"
          required
        />
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
          placeholder="Choose a strong password"
          required
        />
        <Button className="w-full" loading={loading} type="submit">
          Sign up
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
