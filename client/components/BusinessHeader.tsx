import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigation } from "@/hooks/use-navigation";
import { useLocation } from "react-router-dom";

export const BusinessHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [benefitsExpanded, setBenefitsExpanded] = useState(false);
  const { pathname } = useLocation();
  const { navigate } = useNavigation();

  const mainMenuItems = [
    { path: "/business/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/business/customers", label: "Clientes", icon: Users },
    { path: "/business/settings", label: "Configuración", icon: Settings },
  ];

  const benefitsSubItems = [
    {
      path: "/business/points",
      label: "Puntos",
      description: "Configuración base",
    },
    {
      path: "/business/rewards",
      label: "Recompensas",
      description: "Gestión de premios",
    },
    {
      path: "/business/promotions",
      label: "Promociones",
      description: "Campañas temporales",
    },
  ];

  const isActive = (path: string) => pathname === path;
  const isBenefitsActive = [
    "/business/points",
    "/business/rewards",
    "/business/promotions",
  ].includes(pathname);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="md:hidden sticky top-0 z-40 px-4 py-4 bg-background border-b border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-bird text-primary"
                aria-hidden="true"
              >
                <path d="M16 7h.01"></path>
                <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"></path>
                <path d="m20 7 2 .5-2 .5"></path>
                <path d="M10 18v3"></path>
                <path d="M14 17.75V21"></path>
                <path d="M7 18a6 6 0 0 0 3.84-10.61"></path>
              </svg>
            </div>
            <div className="flex gap-0.5 items-end">
            <h1 class="text-lg font-semibold tracking-tighter text-white">
              KORVO
            </h1>
              <span className="text-primary italic font-medium text-xs uppercase tracking-wide pb-1 ">
              business
            </span>
            </div>
            
          </div>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="mt-4 space-y-2 border-t border-white/5 pt-4 animate-fade-in">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm ${
                  active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
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
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap size={20} strokeWidth={1.5} />
                Gestionar Beneficios
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  benefitsExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Submenu Items */}
            {benefitsExpanded && (
              <div className="pl-6 space-y-1 animate-fade-in">
                {benefitsSubItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      handleNavigate(item.path);
                      setBenefitsExpanded(false);
                    }}
                    className="w-full flex flex-col items-start px-4 py-2 rounded-lg transition-all hover:bg-white/5 border border-transparent text-neutral-400 hover:text-white text-left text-xs"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-[10px] text-neutral-600 mt-0.5">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent transition-all font-medium text-sm"
          >
            <LogOut size={20} strokeWidth={1.5} />
            Volver a Usuario
          </button>
        </nav>
      )}
    </header>
  );
};
