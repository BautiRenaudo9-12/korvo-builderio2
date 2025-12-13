import { ReactNode } from 'react';
import { BusinessSideNav } from './BusinessSideNav';
import { BusinessHeader } from './BusinessHeader';

interface BusinessLayoutProps {
  children: ReactNode;
}

export const BusinessLayout = ({ children }: BusinessLayoutProps) => {
  return (
    <div className="w-full h-[100dvh] bg-[#1a1a1a] flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <BusinessHeader />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <BusinessSideNav />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto w-full bg-[#1a1a1a]">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
