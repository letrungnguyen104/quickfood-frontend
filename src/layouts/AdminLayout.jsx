import { Link, useLocation, Outlet } from 'react-router-dom';
import { ShieldCheck, LogOut, Store, Users } from 'lucide-react';
import { Toast } from '../utils/toast';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function AdminLayout() {
  const location = useLocation();
    const dispatch = useDispatch();

  const navigation = [
    { name: 'Pending Approvals', href: '/admin', icon: ShieldCheck },
    { name: 'All Restaurants', href: '/admin/restaurants', icon: Store },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const handleLogout = () => {
    dispatch(logout());
    Toast.success("Logged out successfully");
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-10 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-950">
          <ShieldCheck className="w-8 h-8 text-primary-500 mr-3" />
          <span className="text-xl font-bold tracking-tight">Admin System</span>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-950">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-xl w-full transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}