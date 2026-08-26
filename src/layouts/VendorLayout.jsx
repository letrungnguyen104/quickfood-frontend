import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Menu as MenuIcon, Store, LogOut, UtensilsCrossed } from 'lucide-react';
import { Toast } from '../utils/toast';

export default function VendorLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
    { name: 'Menu Management', href: '/vendor/menu', icon: MenuIcon },
    { name: 'Restaurant Info', href: '/vendor/profile', icon: Store },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    Toast.success("Logged out successfully");
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex md:flex-col shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <UtensilsCrossed className="w-8 h-8 text-primary-600 mr-3" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">Vendor Portal</span>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== '/vendor');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm">
          <UtensilsCrossed className="w-6 h-6 text-primary-600 mr-2" />
          <span className="text-lg font-bold text-gray-900">Vendor Portal</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}