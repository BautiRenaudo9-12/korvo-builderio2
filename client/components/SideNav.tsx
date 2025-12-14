import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wallet, Compass, User } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home, path: '/' },
  { id: 'wallet', label: 'Billetera', icon: Wallet, path: '/wallet' },
  { id: 'explore', label: 'Explorar', icon: Compass, path: '/explore' },
];

export const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#1a1a1a] border-r border-white/5 p-6 h-[100dvh] sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-primary-10 rounded-lg flex items-center justify-center border border-primary-20">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" viewBox="0 0 24 24" data-icon="lucide:bird" data-width="18" data-stroke-width="1.5" class="iconify text-primary iconify--lucide"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 7h.01M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"></path><path d="m20 7l2 .5l-2 .5M10 18v3m4-3.25V21m-7-3a6 6 0 0 0 3.84-10.61"></path></g></svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tighter text-white">KORVO</h1>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive
                  ? 'bg-primary-10 text-primary border border-primary-20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile Bottom */}
      <button
        onClick={() => navigate('/profile')}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent transition-all group"
      >
        <User size={20} strokeWidth={1.5} />
        <span className="font-medium">Perfil</span>
      </button>
    </aside>
  );
};
