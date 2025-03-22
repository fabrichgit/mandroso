import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Building2, Briefcase, Wallet, Phone, Receipt, Menu } from 'lucide-react';

const navItems = [
  { path: '/banks', label: 'Banques', icon: Building2 },
  { path: '/caisses', label: 'Caisses', icon: Briefcase },
  { path: '/coffreforts', label: 'Coffre-forts', icon: Wallet },
  { path: '/mobilebankings', label: 'Mobile Banking', icon: Phone },
  { path: '/transactions', label: 'Transactions', icon: Receipt },
];

export default function Layout({setTab, children}: {setTab: Function, children?: React.ReactNode}) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-y-auto">
      {/* Mobile sidebar toggle */}
      {/* <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div> */}

      {/* Sidebar */}
      <aside
        className={`w-full h-max transition-transform ${
          isSidebarOpen ? '' : ''
        } `}
      >
        <nav className="h-full px-3 py-4 overflow-x-auto bg-white border-r">
          <ul className="flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => setTab(item.path)}
                    className={`flex items-center p-2 rounded-lg ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="ml-3 text-nowrap sm:inline hidden">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="p-4 pt-20 lg:pt-4">
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  );
}