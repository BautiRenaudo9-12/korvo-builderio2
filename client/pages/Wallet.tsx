import { useNavigation } from '@/hooks/use-navigation';
import { mockWalletCards } from '@/lib/data';
import { ChevronRight, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';

export default function Wallet() {
  const { goToStoreDetail } = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 min-h-full">
      <h2 className="text-xl md:text-3xl font-semibold text-white tracking-tight mb-6 md:mb-8 animate-fade-in">
        Mis Tarjetas
      </h2>
      <div className="pb-20 md:pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mockWalletCards.map((card, index) => {
          const percentage = (card.stamps / card.total) * 100;
          return (
            <div
              key={card.id}
              onClick={() => goToStoreDetail(card.id)}
              className="glass-panel rounded-2xl p-5 md:p-6 relative overflow-hidden group animate-fade-in cursor-pointer active:scale-95 transition-all border border-white/5 hover:border-white/10"
              style={{
                animationDelay: `${index * 50}ms`,
                background: `linear-gradient(to bottom right, rgba(0,0,0,0), rgba(0,0,0,0)), linear-gradient(to bottom right, var(--card-bg))`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-40 group-hover:opacity-50 transition-opacity`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/5 shadow-lg flex-shrink-0">
                      {/* Icon rendering */}
                      <span className={`text-neutral-200 text-lg md:text-xl`}>☕</span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white tracking-tight text-sm md:text-base">{card.shop}</h3>
                      <p className="text-[10px] md:text-xs text-neutral-400">{card.ptsBalance} Pts disponibles</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(card.id);
                      }}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 transition-all"
                    >
                      <Heart
                        size={16}
                        className={`transition-all ${
                          isFavorite(card.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-white/50 hover:text-white/80'
                        }`}
                      />
                    </button>
                    <ChevronRight size={18} className="text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                </div>
                <div className="w-full h-1.5 md:h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: card.color,
                      boxShadow: `0 0 10px ${card.color}40`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
