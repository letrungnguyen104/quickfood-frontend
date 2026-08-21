import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-soft"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce-soft" style={{ animationDelay: '1s' }}></div>

      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-slide-up border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="bg-primary-100 p-3 rounded-full mb-4 hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-8 h-8 text-primary-600" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{title}</h2>
          {subtitle && <p className="text-gray-500 text-center text-sm">{subtitle}</p>}
        </div>
        
        {children}
      </div>
    </div>
  );
}