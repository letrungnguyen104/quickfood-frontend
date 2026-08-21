import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import { authService } from "../../services/authService";
import { Toast } from "../../utils/toast";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return Toast.error("Please fill in all fields");
    }

    try {
      setIsLoading(true);
      const res = await authService.register(formData);
      if (res.success) {
        Toast.success("Registration successful! Please check your email.");
        navigate("/verify-otp", { state: { email: formData.email } });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join QuickFood and start ordering today.">
      <form onSubmit={handleRegister}>
        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" />
        
        <div className="mt-6">
          <Button className="w-full" type="submit" variant="primary" isLoading={isLoading}>
            Create Account
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}