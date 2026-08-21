import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Toast } from "../../utils/toast";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import OtpInput from "../../components/OtpInput";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!email) navigate("/register");
  }, [email, navigate]);

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) return Toast.error("Please enter all 6 digits");

    try {
      setIsLoading(true);
      const res = await authService.verifyOtp({ email, otp: otpCode });
      if (res.success) {
        Toast.success("Account verified successfully! Please sign in.");
        navigate("/login");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      const res = await authService.resendOtp({ email });
      if (res.success) {
        Toast.success("A new verification code has been sent to your email!");
        setTimer(60);
      }
    } catch (error) {
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout title="Verify Your Email" subtitle={`We sent a 6-digit code to ${email}`}>
      <form onSubmit={handleVerify} className="flex flex-col items-center">
        
        <OtpInput length={6} otp={otp} setOtp={setOtp} />

        <div className="w-full">
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Verify Account
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Didn't receive the code?{" "}
          {timer > 0 ? (
            <span className="font-semibold text-gray-400">Resend in {timer}s</span>
          ) : (
            <button 
              type="button" 
              onClick={handleResend} 
              disabled={isResending}
              className="font-semibold text-primary-600 hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend now"}
            </button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}