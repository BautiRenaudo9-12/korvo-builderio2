import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockWalletCards } from '@/lib/data';
import { Search, Zap, TrendingUp, ArrowUp, MapPin, Clock, Gift, Tag, DollarSign } from 'lucide-react';
import { WalletCard } from '@/types';

type SortOption = 'name' | 'points' | 'stamps';

export default function AllBusinesses() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<WalletCard | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('points');
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);

  useEffect(() => {
    if (id) {
      const business = mockWalletCards.find((b) => b.id === Number(id));
      setSelectedBusiness(business || null);
    } else {
      setSelectedBusiness(null);
    }
  }, [id]);

  const filteredAndSorted = useMemo(() => {
    let filtered = mockWalletCards.filter((b) =>
      b.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
  }, [searchQuery, sortBy]);

  if (selectedBusiness) {
    return (
      <div className="px-6 md:px-8 pt-4 md:pt-8 pb-24 animate-fade-in">
        <button
          onClick={() => navigate('/businesses')}
          className="flex items-center gap-2 text-primary-400 hover:text-primary transition-colors mb-6"
        >
          <ArrowUp size={18} className="rotate-180" />
          <span className="text-sm md:text-base">Volver a Mis Negocios</span>
        </button>

        {/* Cover Image */}
        <div
          className="w-full h-48 md:h-64 rounded-xl mb-6 bg-cover bg-center relative overflow-hidden shadow-lg"
          style={{
            backgroundImage: `linear-gradient(135deg, ${selectedBusiness.color}40 0%, transparent 100%), url(${selectedBusiness.cover})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Business Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {selectedBusiness.shop}
          </h1>
          <div className="flex items-center gap-2 text-foreground/60 mb-3">
            <MapPin size={16} />
            <p className="text-sm md:text-base">{selectedBusiness.address}</p>
          </div>
          <div className="flex items-center gap-2 text-foreground/60">
            <Clock size={16} />
            <p className="text-sm md:text-base">Última visita: {selectedBusiness.lastVisit}</p>
          </div>
        </div>

        {/* Points Card */}
        <div className="glass-panel rounded-xl p-4 md:p-6 border border-border mb-8">
          <p className="text-xs md:text-sm text-foreground/70 font-medium mb-2">Puntos Disponibles</p>
          <p
            className="text-3xl md:text-4xl font-bold"
            style={{ color: selectedBusiness.color }}
          >
            {selectedBusiness.ptsBalance}
            <span className="text-sm md:text-base font-medium text-foreground/70 ml-2">pts</span>
          </p>
        </div>

        {/* Mini Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Canjear por Dinero - First */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={20} className="text-success" />
              <h2 className="text-lg font-semibold text-foreground">Canjear</h2>
            </div>
            <div className=" rounded-lg p-4  bg-white shadow-xl space-y-4">
              <div>
                <p className="text-xs text-foreground/70 font-medium mb-3">Puntos a Canjear</p>
                <input
                  type="number"
                  min="0"
                  max={selectedBusiness.ptsBalance}
                  value={pointsToRedeem}
                  onChange={(e) => setPointsToRedeem(Math.max(0, Number(e.target.value)))}
                  className="w-full border border-border/2 rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50"
                  placeholder="Ingresa cantidad..."
                />
              </div>

              {pointsToRedeem > 0 && (
                <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                  <p className="text-xs text-foreground/70 font-medium mb-1">Recibirás</p>
                  <p className="text-2xl font-bold text-primary">
                    ${(pointsToRedeem / 50).toFixed(2)}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">{pointsToRedeem} puntos</p>
                </div>
              )}

              <button
                onClick={() => {
                  if (pointsToRedeem > 0 && pointsToRedeem <= selectedBusiness.ptsBalance) {
                    alert(`Canjeaste ${pointsToRedeem} puntos exitosamente`);
                    setPointsToRedeem(0);
                  }
                }}
                disabled={pointsToRedeem <= 0 || pointsToRedeem > selectedBusiness.ptsBalance}
                className="w-full bg-gradient-to-r from-success to-primary text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
                style={{
                  backgroundColor: pointsToRedeem > 0 && pointsToRedeem <= selectedBusiness.ptsBalance ? selectedBusiness.color : undefined,
                }}
              >
                Confirmar Canje
              </button>
            </div>
          </div>

          {/* Premios Disponibles */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gift size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Premios</h2>
            </div>
            <div className="space-y-2">
              {selectedBusiness.rewards.slice(0, 3).map((reward) => (
                <div
                  key={reward.id}
                  className="glass-panel rounded-lg p-3 border border-border hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02]"
                >
                  <p className="text-sm font-medium text-foreground">{reward.name}</p>
                  <p
                    className="text-xs font-bold mt-1"
                    style={{ color: selectedBusiness.color }}
                  >
                    {reward.cost} pts
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Descuentos Disponibles */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Tag size={20} className="text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Descuentos</h2>
            </div>
            <div className="space-y-2">
              <div className="glass-panel rounded-lg p-3 border border-border hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02]">
                <p className="text-sm font-medium text-foreground">10% Descuento</p>
                <p className="text-xs text-foreground/60 mt-1">300 pts</p>
              </div>
              <div className="glass-panel rounded-lg p-3 border border-border hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02]">
                <p className="text-sm font-medium text-foreground">20% Descuento</p>
                <p className="text-xs text-foreground/60 mt-1">500 pts</p>
              </div>
              <div className="glass-panel rounded-lg p-3 border border-border hover:border-primary/30 transition-all cursor-pointer hover:bg-white/[0.02]">
                <p className="text-sm font-medium text-foreground">Envío Gratis</p>
                <p className="text-xs text-foreground/60 mt-1">200 pts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 pb-24">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mis Negocios</h1>
        <p className="text-muted-foreground text-sm">
          {filteredAndSorted.length} negocio{filteredAndSorted.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 md:mb-8">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Buscar negocio o dirección..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto pb-2">
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
                  ? 'bg-primary/10 border border-primary/30 text-primary font-semibold'
                  : 'bg-secondary border border-border text-foreground hover:bg-secondary/60 hover:border-border/70 font-semibold'
              }`}
            >
              <Icon size={14} />
              {labels[option]}
            </button>
          );
        })}
      </div>

      {/* Business List */}
      {filteredAndSorted.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {filteredAndSorted.map((business, index) => (
            <button
              key={business.id}
              onClick={() => navigate(`/businesses/${business.id}`)}
              className="w-full text-left glass-panel rounded-xl border border-border hover:border-primary/30 transition-all hover:bg-black/[0.02] overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="p-4 md:p-5 flex gap-4 md:gap-5">
                {/* Cover Image */}
                <div
                  className="w-20 md:w-24 h-20 md:h-24 rounded-lg flex-shrink-0 bg-cover bg-center relative overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${business.color}30 0%, transparent 100%), url(${business.cover})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div
                    className="absolute top-2 right-2 w-3 h-3 rounded-full shadow-lg"
                    style={{ backgroundColor: business.color }}
                  ></div>
                </div>

                {/* Business Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="text-base md:text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {business.shop}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground/60 line-clamp-2">
                      {business.address}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-secondary rounded-lg p-2 md:p-3 border border-border">
                      <p className="text-[10px] md:text-xs text-foreground/70 font-medium mb-1">
                        Puntos
                      </p>
                      <p
                        className="text-sm md:text-base font-bold"
                        style={{ color: business.color }}
                      >
                        {business.ptsBalance}
                      </p>
                    </div>

                    <div className="bg-secondary rounded-lg p-2 md:p-3 border border-border">
                      <p className="text-[10px] md:text-xs text-foreground/70 font-medium mb-1">
                        Sellos
                      </p>
                      <p className="text-sm md:text-base font-bold text-foreground">
                        {business.stamps}/{business.total}
                      </p>
                    </div>

                    <div className="bg-secondary rounded-lg p-2 md:p-3 border border-border">
                      <p className="text-[10px] md:text-xs text-foreground/70 font-medium mb-1">
                        Avance
                      </p>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
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

              <div className="px-4 md:px-5 py-3 md:py-4 border-t border-border bg-black/[0.01] text-[10px] md:text-xs text-foreground/60 flex items-center justify-between">
                <span>Última visita: {business.lastVisit}</span>
                <span className="text-foreground/60">→</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search size={32} className="text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-sm">
            No encontramos negocios que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
