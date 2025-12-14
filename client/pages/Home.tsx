import { useNavigation } from '@/hooks/use-navigation';
import { mockUser, mockWalletCards } from '@/lib/data';
import { Gift, History } from 'lucide-react';
import { BusinessCarousel } from '@/components/BusinessCarousel';

export default function HomeVibrant() {
  const { goToWallet, goToActivity, goToAllBusinesses } = useNavigation();

  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 animate-fade-in bg-purple-950">
      <div className="mb-8 md:mb-12">
        <p className="text-purple-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">
          Buenos días, {mockUser.name}
        </p>
        <div className="flex items-end gap-2">
          <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter">
            {mockUser.points.toLocaleString()}
          </h2>
          <span className="text-pink-500 font-medium pb-1.5 md:pb-3 text-xs md:text-sm tracking-wide">PTS TOTALES</span>
        </div>
      </div>

      {/* QR Identity */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden group mb-6 md:mb-8 shadow-2xl border border-pink-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent pointer-events-none"></div>
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
            <div className="qr-scan-line" style={{ background: '#ec4899', boxShadow: '0 0 10px #ec4899' }}></div>
          </div>
          <p className="text-purple-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">ID: 884-291-KOR</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 delay-100 animate-fade-in">
        <button
          onClick={goToWallet}
          className="glass-panel p-4 md:p-6 rounded-xl flex items-center gap-3 hover:bg-pink-500/5 transition-colors text-left group border border-pink-500/20 md:col-span-2"
        >
          <div className="w-9 md:w-12 h-9 md:h-12 rounded-full bg-purple-800 flex items-center justify-center border border-pink-500/30 group-hover:border-pink-500/50 transition-colors flex-shrink-0">
            <Gift size={16} className="text-purple-300 md:hidden" />
            <Gift size={20} className="text-purple-300 hidden md:block" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold text-white">Canjear</p>
            <p className="text-[10px] md:text-xs text-purple-500">Ir a billetera</p>
          </div>
        </button>
        <button
          onClick={goToActivity}
          className="glass-panel p-4 md:p-6 rounded-xl flex items-center gap-3 hover:bg-pink-500/5 transition-colors text-left group border border-pink-500/20 md:col-span-2"
        >
          <div className="w-9 md:w-12 h-9 md:h-12 rounded-full bg-purple-800 flex items-center justify-center border border-pink-500/30 group-hover:border-pink-500/50 transition-colors flex-shrink-0">
            <History size={16} className="text-purple-300 md:hidden" />
            <History size={20} className="text-purple-300 hidden md:block" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-semibold text-white">Actividad</p>
            <p className="text-[10px] md:text-xs text-purple-500">Ver historial</p>
          </div>
        </button>
      </div>

      {/* Business Carousel */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm md:text-base font-semibold text-white">Mis Negocios</h3>
          <button
            onClick={goToAllBusinesses}
            className="text-xs md:text-sm text-purple-400 hover:text-pink-500 transition-colors flex items-center gap-1 group"
          >
            Ver todos
            <span>→</span>
          </button>
        </div>

        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {mockWalletCards.map((business) => (
            <div
              key={business.id}
              className="flex-shrink-0 w-40 md:w-48 glass-panel rounded-lg p-3 md:p-4 border border-pink-500/20 hover:border-pink-500/40 transition-all hover:bg-pink-500/[0.02]"
            >
              <div
                className="w-full h-20 md:h-24 rounded-md mb-3 bg-cover bg-center relative overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, #ec489920 0%, transparent 100%), url(${business.cover})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              <div className="space-y-2">
                <p className="text-xs md:text-sm font-semibold text-white truncate">
                  {business.shop}
                </p>

                <div className="flex items-baseline gap-1">
                  <span className="text-base md:text-lg font-semibold text-pink-500">
                    {business.ptsBalance}
                  </span>
                  <span className="text-[10px] md:text-xs text-purple-500">pts</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-purple-500">
                      {business.stamps}/{business.total}
                    </span>
                    <span className="text-[10px] text-purple-600">sellos</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(business.stamps / business.total) * 100}%`,
                        backgroundColor: '#ec4899',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}