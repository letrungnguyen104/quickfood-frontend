import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AuthLayout from "../../layouts/AuthLayout";
import OtpInput from "../../components/OtpInput";
import { authService } from "../../services/authService";
import { Toast } from "../../utils/toast";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length < 6) return Toast.error("Please enter the full 6-digit OTP");
    if (!newPassword || newPassword.length < 6) return Toast.error("Password must be at least 6 characters");

    try {
      setIsLoading(true);
      const res = await authService.resetPassword({ email, otp: otpCode, newPassword });
      if (res.success) {
        Toast.success("Password reset successfully! You can now login.");
        navigate("/login");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password" subtitle={`Enter the code sent to ${email}`}>
      <form onSubmit={handleResetPassword} className="flex flex-col items-center">
        <OtpInput length={6} otp={otp} setOtp={setOtp} />

        <InputField 
          label="New Password" 
          name="newPassword" 
          type="password" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          placeholder="Enter new password" 
        />
        
        <div className="w-full mt-4">
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Update Password
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}