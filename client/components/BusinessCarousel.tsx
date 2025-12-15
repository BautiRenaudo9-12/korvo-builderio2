import { WalletCard } from '@/types';
import { ChevronRight, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';

interface BusinessCarouselProps {
  businesses: WalletCard[];
  onViewAll?: () => void;
}

export const BusinessCarousel = ({ businesses, onViewAll }: BusinessCarouselProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm md:text-base font-semibold text-white">Mis Negocios</h3>
        <button
          onClick={onViewAll}
          className="text-xs md:text-sm text-neutral-400 hover:text-primary transition-colors flex items-center gap-1 group"
        >
          Ver todos
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {businesses.map((business) => (
          <div
            key={business.id}
            className="flex-shrink-0 w-40 md:w-48 glass-panel rounded-lg p-3 md:p-4 border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.02]"
          >
            {/* Cover Image */}
            <div
              className="w-full h-20 md:h-24 rounded-md mb-3 bg-cover bg-center relative overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(135deg, ${business.color}20 0%, transparent 100%), url(${business.cover})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(business.id);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all"
              >
                <Heart
                  size={16}
                  className={`transition-all ${
                    isFavorite(business.id)
                      ? 'fill-destructive text-destructive'
                      : 'text-white/70 hover:text-white'
                  }`}
                />
              </button>
            </div>

            {/* Business Info */}
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-semibold text-white truncate">
                {business.shop}
              </p>

              {/* Points Balance */}
              <div className="flex items-baseline gap-1">
                <span className="text-base md:text-lg font-semibold" style={{ color: business.color }}>
                  {business.ptsBalance}
                </span>
                <span className="text-[10px] md:text-xs text-neutral-500">pts</span>
              </div>

              {/* Stamps Progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">
                    {business.stamps}/{business.total}
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">sellos</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(business.stamps / business.total) * 100}%`,
                      backgroundColor: business.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
