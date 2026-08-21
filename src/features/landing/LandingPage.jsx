import { Link } from "react-router-dom";
import { ChefHat, ArrowRight } from "lucide-react";
import Button from "../../components/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-primary-100 to-transparent"></div>
      
      <div className="relative z-10 text-center max-w-2xl animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-500 p-4 rounded-2xl shadow-lg transform rotate-3">
            <ChefHat className="w-12 h-12 text-white transform -rotate-3" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Food Delivery, <span className="text-primary-600">Reimagined.</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 font-sans">
          Experience the fastest and most reliable food delivery service. 
          Fresh from your favorite local restaurants, right to your doorstep.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="primary" className="px-8 py-3 text-lg flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="px-8 py-3 text-lg bg-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}