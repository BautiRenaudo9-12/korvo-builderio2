import { useParams } from 'react-router-dom';
import { mockWalletCards } from '@/lib/data';
import { MapPin, Instagram, Map, Lock } from 'lucide-react';

export default function StoreDetail() {
  const { id } = useParams<{ id: string }>();
  const shop = mockWalletCards.find((c) => c.id === Number(id));

  if (!shop) {
    return (
      <div className="px-6 md:px-8 pt-4 md:pt-8 pb-24 md:pb-8 text-center">
        <p className="text-neutral-400">Tienda no encontrada</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-24 md:pb-8">
      {/* Header Image */}
      <div className="w-full h-48 md:h-64 lg:h-72 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent z-10"></div>
        <img
          src={shop.cover}
          alt={shop.shop}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-4 md:bottom-6 left-6 md:left-8 z-20">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{shop.shop}</h2>
          <div className="flex items-center gap-2 mt-1 md:mt-2">
            <MapPin size={12} className="text-neutral-400 md:hidden" />
            <MapPin size={16} className="text-neutral-400 hidden md:block" />
            <p className="text-xs md:text-sm text-neutral-300 font-medium">{shop.address}</p>
          </div>
        </div>
        <div className="absolute bottom-4 md:bottom-6 right-6 md:right-8 z-20 flex gap-2">
          <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors">
            <Instagram size={14} />
          </button>
          <button
            onClick={() => window.open(`https://maps.google.com/?q=${shop.shop} ${shop.address}`, '_blank')}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors"
          >
            <Map size={14} />
          </button>
        </div>
      </div>

      <div className="px-6 md:px-8 -mt-2 relative z-20 max-w-4xl mx-auto">
        {/* Status Card */}
        <div className="glass-panel rounded-xl p-5 md:p-8 border border-amber-500/20 bg-[#1a1a1a]/80 backdrop-blur-md shadow-2xl mb-8 md:mb-12">
          <div className="flex justify-between items-end mb-4 md:mb-6">
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1 md:mb-2">
                Tu Balance
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {shop.ptsBalance} <span className="text-sm md:text-base font-medium text-neutral-500">pts</span>
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] md:text-xs text-neutral-500">{shop.rate}</p>
            </div>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 md:h-2 rounded-full overflow-hidden">
            <div
              className="rounded-full w-2/3"
              style={{
                backgroundColor: shop.color,
                boxShadow: `0 0 10px ${shop.color}`,
              }}
            ></div>
          </div>
        </div>

        {/* Catalog */}
        <h3 className="text-sm md:text-xl font-semibold text-white mb-4 md:mb-6">Recompensas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {shop.rewards.map((reward) => {
            const canAfford = shop.ptsBalance >= reward.cost;
            const stateClass = canAfford
              ? 'bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer'
              : 'bg-white/0 border-white/5 opacity-50 cursor-not-allowed';

            return (
              <div key={reward.id} className={`glass-panel p-3 md:p-4 rounded-xl border flex flex-col gap-3 transition-colors group relative overflow-hidden ${stateClass}`}>
                {!canAfford && (
                  <div className="absolute top-2 right-2">
                    <Lock size={12} className="text-neutral-600 md:hidden" />
                    <Lock size={14} className="text-neutral-600 hidden md:block" />
                  </div>
                )}
                <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-neutral-900 flex items-center justify-center text-lg md:text-xl">
                  {reward.icon === 'lucide:cookie' && <span>🍪</span>}
                  {reward.icon === 'lucide:cup-soda' && <span>🥤</span>}
                  {reward.icon === 'lucide:coffee' && <span>☕</span>}
                  {reward.icon === 'lucide:croissant' && <span>🥐</span>}
                  {reward.icon === 'lucide:cake-slice' && <span>🍰</span>}
                  {reward.icon === 'lucide:leaf' && <span>🍃</span>}
                </div>
                <div>
                  <p className={`text-xs md:text-sm font-medium leading-tight ${canAfford ? 'text-white' : 'text-neutral-500'}`}>
                    {reward.name}
                  </p>
                  <p className="text-[10px] md:text-xs text-neutral-500 mt-0.5">{reward.cost} pts</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
