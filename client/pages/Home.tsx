import { useNavigation } from '@/hooks/use-navigation';
import { mockUser, mockWalletCards } from '@/lib/data';
import { Gift, History } from 'lucide-react';
import { BusinessCarousel } from '@/components/BusinessCarousel';

export default function Home() {
  const { goToWallet, goToActivity, goToAllBusinesses } = useNavigation();

  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 animate-fade-in">

      


      <div className="mb-8 md:mb-12">
        <p className="text-neutral-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">
          Buenos días, {mockUser.name}
        </p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter">
            {mockUser.points.toLocaleString()}
          </h2>
          <span className="text-primary font-medium pb-1.5 md:pb-3 text-xs md:text-sm tracking-wide">PTS TOTALES</span>
        </div>
      </div>



      {/* QR Identity */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden group mb-6 md:mb-8 shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="w-48 md:w-64 h-48 md:h-64 bg-white p-3 rounded-xl relative overflow-hidden shadow-inner mb-4 md:mb-6">
            <div className="w-full h-full bg-neutral-900 grid grid-cols-6 grid-rows-6 gap-0.5 p-1">
              <div className="col-span-2 row-span-2 bg-black border-[3px] border-white"></div>
              <div className="col-span-2 row-span-2 col-start-5 bg-black border-[3px] border-white"></div>
              <div className="col-span-2 row-span-2 row-start-5 bg-black border-[3px] border-white"></div>
              <div className="col-span-2 row-span-2 col-start-3 row-start-3 bg-white/90"></div>
              <div className="bg-white/90 col-start-3"></div>
              <div className="bg-white/90 row-start-4"></div>
              <div className="bg-white/90 col-start-6 row-start-5"></div>
            </div>
            <div className="qr-scan-line"></div>
          </div>
          <p className="text-neutral-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">ID: 884-291-KOR</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 delay-100 animate-fade-in">
        <button
          onClick={goToWallet}
          className="glass-panel p-4 md:p-6 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-colors text-left group border border-white/5 md:col-span-2"
        >
          <div className="w-9 md:w-12 h-9 md:h-12 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors flex-shrink-0">
            <Gift size={16} className="text-neutral-300 md:hidden" />
            <Gift size={20} className="text-neutral-300 hidden md:block" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold text-white">Canjear</p>
            <p className="text-[10px] md:text-xs text-neutral-500">Ir a billetera</p>
          </div>
        </button>
        <button
          onClick={goToActivity}
          className="glass-panel p-4 md:p-6 rounded-xl flex items-center gap-3 hover:bg-white/5 transition-colors text-left group border border-white/5 md:col-span-2"
        >
          <div className="w-9 md:w-12 h-9 md:h-12 rounded-full bg-neutral-800 flex items-center justify-center border border-white/5 group-hover:border-primary/50 transition-colors flex-shrink-0">
            <History size={16} className="text-neutral-300 md:hidden" />
            <History size={20} className="text-neutral-300 hidden md:block" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold text-white">Actividad</p>
            <p className="text-[10px] md:text-xs text-neutral-500">Ver historial</p>
          </div>
        </button>
      </div>

      {/* Business Carousel */}
      <BusinessCarousel
        businesses={mockWalletCards}
        onViewAll={goToAllBusinesses}
      />

      
    </div>
  );
}
