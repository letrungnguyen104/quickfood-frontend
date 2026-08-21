import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import { authService } from "../../services/authService";
import { Toast } from "../../utils/toast";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return Toast.error("Please enter your email");

    try {
      setIsLoading(true);
      const res = await authService.forgotPassword({ email });
      if (res.success) {
        Toast.success("OTP sent to your email!");
        navigate("/reset-password", { state: { email } });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset code.">
      <form onSubmit={handleSendOtp}>
        <InputField 
          label="Email Address" 
          name="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your registered email" 
        />
        
        <div className="mt-6">
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Send Reset Code
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}