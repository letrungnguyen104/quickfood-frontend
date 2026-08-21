import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-500 text-white p-1.5 rounded-lg">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="font-bold text-2xl text-gray-900 tracking-tight">Quick<span className="text-primary-600">Food</span></span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors"
                placeholder="Search for restaurants or dishes..."
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-gray-500 hover:text-primary-600 relative p-2">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                3
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="relative flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                    U
                  </div>
                  <span className="text-sm font-medium text-gray-700">My Account</span>
                </div>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors p-2" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                <Link to="/login" className="text-gray-600 font-medium hover:text-primary-600">Log in</Link>
                <Link to="/register">
                  <Button variant="primary" className="!py-2 !px-4 !rounded-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-900 p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <input
            type="text"
            className="w-full pl-4 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:border-primary-500"
            placeholder="Search..."
          />
          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-500 font-medium p-2">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login"><Button variant="outline" className="w-full">Log in</Button></Link>
              <Link to="/register"><Button variant="primary" className="w-full">Sign up</Button></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}