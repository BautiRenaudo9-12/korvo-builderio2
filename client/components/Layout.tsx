import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShowNav = !['/login', '/register'].includes(location.pathname);
  const isDetailRoute = ['/store'].some((path) => location.pathname.startsWith(path));

  return (
    <div className="w-full h-[100dvh] bg-black flex overflow-hidden">
      {/* Desktop Sidebar */}
      {shouldShowNav && <SideNav />}

      {/* Main Content Container */}
      <div className="flex flex-col flex-1 w-full bg-[#1a1a1a]">
        <Header isDetailRoute={isDetailRoute} onBack={() => navigate(-1)} />
        <main id="app-content" className="flex-1 overflow-y-auto pb-24 md:pb-8 scroll-smooth no-scrollbar relative bg-[#1a1a1a]">
          <div className="w-full md:max-w-5xl lg:max-w-6xl md:mx-auto">
            {children}
          </div>
        </main>
        {/* Mobile Bottom Navigation */}
        {shouldShowNav && <BottomNav currentRoute={location.pathname} />}
      </div>
    </div>
  );
};
