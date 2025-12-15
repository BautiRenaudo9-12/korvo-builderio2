import { useState } from 'react';
import { LayoutDashboard, Users, Settings, LogOut, ChevronDown, Zap } from 'lucide-react';
import { useNavigation } from '@/hooks/use-navigation';
import { useLocation } from 'react-router-dom';

export const BusinessSideNav = () => {
  const [benefitsExpanded, setBenefitsExpanded] = useState(false);
  const { pathname } = useLocation();
  const { navigate } = useNavigation();

  const mainMenuItems = [
    { path: '/business/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/business/customers', label: 'Clientes', icon: Users },
    { path: '/business/settings', label: 'Configuración', icon: Settings },
  ];

  const benefitsSubItems = [
    { path: '/business/points', label: 'Puntos', description: 'Configuración base' },
    { path: '/business/rewards', label: 'Recompensas', description: 'Gestión de premios' },
    { path: '/business/promotions', label: 'Promociones', description: 'Campañas temporales' },
  ];

  const isActive = (path: string) => pathname === path;
  const isBenefitsActive = ['/business/points', '/business/rewards', '/business/promotions'].includes(pathname);

  return (
    <aside className="hidden md:flex flex-col w-64 bg-background border-r border-white/5 p-6 h-[100dvh] sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary-20">
          <span className="text-primary font-bold text-lg">K</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tighter text-white">KORVO</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                active
                  ? 'bg-primary/10 text-primary border border-primary-20'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              {item.label}
            </button>
          );
        })}

        {/* Gestionar Beneficios - Expandible */}
        <div className="space-y-1">
          <button
            onClick={() => setBenefitsExpanded(!benefitsExpanded)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all font-medium text-sm ${
              isBenefitsActive
                ? 'bg-primary/10 text-primary border border-primary-20'
                : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <Zap size={20} strokeWidth={1.5} />
              Gestionar Beneficios
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform ${benefitsExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Submenu Items */}
          {benefitsExpanded && (
            <div className="pl-6 space-y-1 animate-fade-in">
              {benefitsSubItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                  }}
                  className="w-full flex flex-col items-start px-4 py-2 rounded-lg transition-all hover:bg-white/5 border border-transparent text-muted-foreground hover:text-white text-left text-xs"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[10px] text-muted-foreground/70 mt-0.5">{item.description}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <button
        onClick={() => navigate('/')}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent transition-all font-medium text-sm"
      >
        <LogOut size={20} strokeWidth={1.5} />
        Volver a Usuario
      </button>
    </aside>
  );
};
