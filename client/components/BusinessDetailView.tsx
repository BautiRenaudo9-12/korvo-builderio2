import { WalletCard } from '@/types';
import { ArrowLeft, MapPin, Clock, TrendingUp, Lock, Gift } from 'lucide-react';

interface BusinessDetailViewProps {
  business: WalletCard;
  onBack: () => void;
}

export const BusinessDetailView = ({ business, onBack }: BusinessDetailViewProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="h-[100dvh] flex flex-col">
        {/* Header with Cover Image */}
        <div className="relative">
          {/* Cover Image */}
          <div
            className="w-full h-40 md:h-56 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, ${business.color}40 0%, transparent 100%), url(${business.cover})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 md:top-6 md:left-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Business Name Overlay */}
          <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 right-16 md:right-64">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">
              {business.shop}
            </h2>
            <div className="flex items-center gap-2 text-neutral-300 text-xs md:text-sm">
              <MapPin size={14} />
              <span>{business.address}</span>
            </div>
          </div>

          {/* Color Indicator */}
          <div
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 rounded-lg shadow-lg"
            style={{ backgroundColor: business.color }}
          ></div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {/* Points */}
              <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 text-center">
                <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-2">
                  Puntos Acumulados
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: business.color }}
                >
                  {business.ptsBalance}
                </p>
              </div>

              {/* Stamps */}
              <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 text-center">
                <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-2">
                  Sellos Conseguidos
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {business.stamps}
                </p>
                <p className="text-[10px] text-neutral-600 mt-1">de {business.total}</p>
              </div>

              {/* Exchange Rate */}
              <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 text-center">
                <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-2">
                  Tasa
                </p>
                <p className="text-xs md:text-sm font-semibold text-white">
                  {business.rate}
                </p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="glass-panel rounded-lg p-6 md:p-8 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-amber-500" />
                <h3 className="text-base md:text-lg font-semibold text-white">
                  Progreso de Sellos
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base font-medium text-white">
                    {business.stamps} de {business.total} sellos
                  </span>
                  <span
                    className="text-sm md:text-base font-bold"
                    style={{ color: business.color }}
                  >
                    {Math.round((business.stamps / business.total) * 100)}%
                  </span>
                </div>

                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(business.stamps / business.total) * 100}%`,
                      backgroundColor: business.color,
                    }}
                  ></div>
                </div>

                <p className="text-xs md:text-sm text-neutral-500">
                  {business.total - business.stamps} sello{business.total - business.stamps !== 1 ? 's' : ''} para completar
                </p>
              </div>
            </div>

            {/* Last Visit Info */}
            <div className="glass-panel rounded-lg p-6 md:p-8 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-amber-500" />
                <h3 className="text-base md:text-lg font-semibold text-white">
                  Última Visita
                </h3>
              </div>
              <p className="text-sm md:text-base text-neutral-300">{business.lastVisit}</p>
            </div>

            {/* Available Rewards */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Gift size={18} className="text-amber-500" />
                <h3 className="text-base md:text-lg font-semibold text-white">
                  Recompensas Disponibles
                </h3>
              </div>

              <div className="space-y-3">
                {business.rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`glass-panel rounded-lg p-4 md:p-5 border transition-all ${
                      reward.locked
                        ? 'border-white/5 opacity-60'
                        : 'border-amber-500/30 bg-amber-500/5'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm md:text-base font-semibold text-white mb-1">
                          {reward.name}
                        </h4>
                        <p className="text-sm md:text-base font-bold text-amber-500">
                          {reward.cost} pts
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        {reward.locked ? (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-neutral-500">
                            <Lock size={16} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400">
                            <Gift size={16} />
                          </div>
                        )}
                      </div>
                    </div>

                    {reward.locked && (
                      <p className="text-xs text-neutral-600 mt-2">
                        Acumula más puntos para desbloquear
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
