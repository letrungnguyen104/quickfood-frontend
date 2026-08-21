import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import { authService } from "../../services/authService";
import { Toast } from "../../utils/toast";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      return Toast.error("Please fill in all fields");
    }

    try {
      setIsLoading(true);
      const res = await authService.login(formData);
      if (res.success) {
        localStorage.setItem("accessToken", res.data.token);
        Toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const res = await authService.googleLogin(credentialResponse.credential);
      if (res.success) {
        localStorage.setItem("accessToken", res.data.token);
        Toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back!" subtitle="Enter your details to access your account.">
      <form onSubmit={handleLogin}>
        <InputField label="Email or Username" name="identifier" value={formData.identifier} onChange={handleChange} placeholder="Enter your email or username" />
        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
        
        <div className="flex justify-end mt-1 mb-5">
          <Link to="/forgot-password" className="text-sm text-primary-600 font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6">
          <Button className="w-full" type="submit" variant="primary" isLoading={isLoading}>
            Sign In
          </Button>
        </div>
      </form>
      
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="px-3 text-gray-500 text-sm font-medium">Or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => Toast.error("Google Authentication Failed")}
          theme="outline"
          size="large"
          text="continue_with"
          width="100%"
        />
      </div>
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Sign up</Link>
      </p>
    </AuthLayout>
  );
}