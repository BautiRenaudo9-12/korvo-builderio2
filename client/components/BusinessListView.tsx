import { useState, useMemo } from 'react';
import { WalletCard } from '@/types';
import { X, Search, Filter, Zap, TrendingUp, ArrowUp, Heart } from 'lucide-react';
import { BusinessDetailView } from './BusinessDetailView';
import { useFavorites } from '@/hooks/use-favorites';

interface BusinessListViewProps {
  businesses: WalletCard[];
  onClose: () => void;
}

type SortOption = 'name' | 'points' | 'stamps';

export const BusinessListView = ({ businesses, onClose }: BusinessListViewProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<WalletCard | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('points');
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let filtered = businesses.filter((b) => {
      const matchesSearch =
        b.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorite = !showOnlyFavorites || isFavorite(b.id);
      return matchesSearch && matchesFavorite;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.ptsBalance - a.ptsBalance;
        case 'stamps':
          return b.stamps - a.stamps;
        case 'name':
          return a.shop.localeCompare(b.shop);
        default:
          return 0;
      }
    });

    return filtered;
  }, [businesses, searchQuery, sortBy, showOnlyFavorites, isFavorite]);

  if (selectedBusiness) {
    return (
      <BusinessDetailView
        business={selectedBusiness}
        onBack={() => setSelectedBusiness(null)}
      />
    );
  }

  return (
    <div className="fixed left-0 top-0 inset-0 z-50 backdrop-blur-lg bg-black/80  animate-fade-in">
      <div className="h-[100dvh] flex flex-col">
        {/* Header */}
        <div className="px-6 md:px-8 pt-4 md:pt-6 pb-4 md:pb-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Mis Negocios</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="text"
              placeholder="Buscar negocio o dirección..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            />
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex gap-2 md:gap-3 mt-4">
            <div className="flex gap-2 flex-1 overflow-x-auto pb-1">
              {(['points', 'stamps', 'name'] as SortOption[]).map((option) => {
                const labels = {
                  points: 'Más Puntos',
                  stamps: 'Más Sellos',
                  name: 'Alfabético',
                };
                const icons = {
                  points: Zap,
                  stamps: TrendingUp,
                  name: ArrowUp,
                };
                const Icon = icons[option];

                return (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all whitespace-nowrap text-xs md:text-sm font-medium ${
                      sortBy === option
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                        : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon size={14} />
                    {labels[option]}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium whitespace-nowrap ${
                showOnlyFavorites
                  ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <Heart size={14} />
              <span className="hidden md:inline">Favoritos</span>
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium whitespace-nowrap ${
                showFilters
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <Filter size={14} />
              <span className="hidden md:inline">Filtros</span>
            </button>
          </div>

          {/* Results Count */}
          <p className="text-xs md:text-sm text-neutral-500 mt-3">
            {filteredAndSorted.length} negocio{filteredAndSorted.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="px-6 md:px-8 py-6 md:py-8 space-y-3 md:space-y-4">
            {filteredAndSorted.length > 0 ? (
              filteredAndSorted.map((business, index) => (
                <button
                  key={business.id}
                  onClick={() => setSelectedBusiness(business)}
                  className="w-full text-left glass-panel rounded-xl border border-white/5 hover:border-amber-500/30 transition-all hover:bg-white/[0.03] overflow-hidden group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Business Card */}
                  <div className="p-4 md:p-5 flex gap-4 md:gap-5">
                    {/* Cover Image */}
                    <div
                      className="w-20 md:w-24 h-20 md:h-24 rounded-lg flex-shrink-0 bg-cover bg-center relative overflow-hidden shadow-lg"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${business.color}30 0%, transparent 100%), url(${business.cover})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {/* Color Accent */}
                      <div
                        className="absolute top-2 right-2 w-3 h-3 rounded-full shadow-lg"
                        style={{ backgroundColor: business.color }}
                      ></div>
                    </div>

                    {/* Business Info */}
                    <div className="flex-1 min-w-0">
                      {/* Title & Address */}
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-base md:text-lg font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                            {business.shop}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(business.id);
                            }}
                            className="flex-shrink-0 p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                          >
                            <Heart
                              size={16}
                              className={`transition-all ${
                                isFavorite(business.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-white/50 hover:text-white/80'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-xs md:text-sm text-neutral-400 line-clamp-2">
                          {business.address}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {/* Points Card */}
                        <div className="bg-white/[0.02] rounded-lg p-2 md:p-3 border border-white/5">
                          <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-1">
                            Puntos
                          </p>
                          <p
                            className="text-sm md:text-base font-bold"
                            style={{ color: business.color }}
                          >
                            {business.ptsBalance}
                          </p>
                        </div>

                        {/* Stamps Card */}
                        <div className="bg-white/[0.02] rounded-lg p-2 md:p-3 border border-white/5">
                          <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-1">
                            Sellos
                          </p>
                          <p className="text-sm md:text-base font-bold text-white">
                            {business.stamps}/{business.total}
                          </p>
                        </div>

                        {/* Progress Bar Card */}
                        <div className="bg-white/[0.02] rounded-lg p-2 md:p-3 border border-white/5">
                          <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-1">
                            Avance
                          </p>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
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
                  </div>

                  {/* Last Visit Info */}
                  <div className="px-4 md:px-5 py-3 md:py-4 border-t border-white/5 bg-white/[0.01] text-[10px] md:text-xs text-neutral-600 flex items-center justify-between">
                    <span>Última visita: {business.lastVisit}</span>
                    <span className="text-neutral-500">→</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search size={32} className="text-neutral-600 mb-4" />
                <p className="text-neutral-400 text-sm">
                  No encontramos negocios que coincidan con tu búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
