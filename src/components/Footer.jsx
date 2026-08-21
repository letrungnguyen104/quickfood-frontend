import { ShoppingBag } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500 text-white p-1.5 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">QuickFood</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Delivering happiness to your door. Fresh, fast, and reliable food delivery service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter className="w-5 h-5"/></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram className="w-5 h-5"/></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-primary-500 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Partner with us</Link></li>
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Ride with us</Link></li>
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="#" className="hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} QuickFood Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}