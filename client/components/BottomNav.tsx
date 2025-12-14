import { useNavigate } from 'react-router-dom';
import { Home, Wallet, Compass } from 'lucide-react';

interface BottomNavProps {
  currentRoute: string;
}

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home, path: '/' },
  { id: 'wallet', label: 'Billetera', icon: Wallet, path: '/wallet' },
  { id: 'explore', label: 'Explorar', icon: Compass, path: '/explore' },
  { id: 'business', label: 'Business', icon: Compass, path: '/business/dashboard' },
];

export const BottomNav = ({ currentRoute }: BottomNavProps) => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden glass-nav fixed bottom-0 left-0 right-0 w-full z-30 pb-safe transition-transform duration-300">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = currentRoute === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className="nav-btn flex flex-col items-center justify-center w-full h-full gap-1 group"
              id={`nav-${id}`}
            >
              <Icon
                size={22}
                strokeWidth={1.5}
                className={`transition-colors ${isActive ? 'text-primary' : 'text-neutral-500 group-hover:text-white'}`}
              />
              <span className={`text-[10px] font-medium transition-colors tracking-wide ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-white'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
