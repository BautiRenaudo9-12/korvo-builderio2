import { useState, useMemo } from 'react';
import { mockTransactions } from '@/lib/data';
import { ArrowDownLeft, ArrowUpRight, Search, Filter } from 'lucide-react';

type TransactionType = 'all' | 'earn' | 'burn';

interface GroupedTransactions {
  month: string;
  year: string;
  monthIndex: number;
  transactions: (typeof mockTransactions)[0][];
}

const getMonthName = (dateStr: string): { month: string; year: string; monthIndex: number } => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  // Parse dates like "Ayer 14:30", "Lunes", "05 Oct", "01 Oct"
  const date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();

  if (dateStr === 'Ayer' || dateStr.includes('14:30')) {
    date.setDate(date.getDate() - 1);
    month = date.getMonth();
    year = date.getFullYear();
  } else if (dateStr === 'Lunes') {
    // Find last Monday
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) - 7;
    date.setDate(diff);
    month = date.getMonth();
    year = date.getFullYear();
  } else if (dateStr.includes('Oct') || dateStr.includes('Octubre')) {
    month = 9; // October
  }

  return {
    month: months[month],
    year: year.toString(),
    monthIndex: month,
  };
};

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndGrouped = useMemo(() => {
    // Filter transactions
    let filtered = mockTransactions.filter((transaction) => {
      const matchesSearch =
        transaction.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.item && transaction.item.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = typeFilter === 'all' || transaction.type === typeFilter;

      return matchesSearch && matchesType;
    });

    // Group by month
    const grouped: Record<string, GroupedTransactions> = {};

    filtered.forEach((transaction) => {
      const { month, year, monthIndex } = getMonthName(transaction.date);
      const key = `${month} ${year}`;

      if (!grouped[key]) {
        grouped[key] = {
          month,
          year,
          monthIndex,
          transactions: [],
        };
      }

      grouped[key].transactions.push(transaction);
    });

    // Sort by month (newest first)
    return Object.values(grouped).sort(
      (a, b) =>
        new Date(b.year, b.monthIndex).getTime() - new Date(a.year, a.monthIndex).getTime()
    );
  }, [searchQuery, typeFilter]);

  const totalEarn = mockTransactions
    .filter((t) => t.type === 'earn')
    .reduce((sum, t) => sum + parseInt(t.amount), 0);

  const totalBurn = mockTransactions
    .filter((t) => t.type === 'burn')
    .reduce((sum, t) => sum + parseInt(t.amount), 0);

  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl md:text-3xl font-semibold text-white tracking-tight mb-6">
          Actividad Reciente
        </h2>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar por negocio o transacción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <button
            onClick={() => setTypeFilter('all')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium ${
              typeFilter === 'all'
                ? 'bg-primary-20 border border-primary-50 text-primary-400'
                : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <Filter size={14} />
            Todas
          </button>

          <button
            onClick={() => setTypeFilter('earn')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium ${
              typeFilter === 'earn'
                ? 'bg-success-20 border border-success/50 text-success-400'
                : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <ArrowDownLeft size={14} />
            Ganadas
          </button>

          <button
            onClick={() => setTypeFilter('burn')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium ${
              typeFilter === 'burn'
                ? 'bg-destructive-20 border border-destructive/50 text-destructive-400'
                : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <ArrowUpRight size={14} />
            Canjeadas
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        <div className="glass-panel rounded-lg p-4 border border-white/5">
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium mb-2">Pts Ganados</p>
          <p className="text-lg md:text-2xl font-bold text-success">+{totalEarn}</p>
        </div>

        <div className="glass-panel rounded-lg p-4 border border-white/5">
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium mb-2">Pts Canjeados</p>
          <p className="text-lg md:text-2xl font-bold text-destructive-400">-{totalBurn}</p>
        </div>

        <div className="glass-panel rounded-lg p-4 border border-white/5">
          <p className="text-[10px] md:text-xs text-neutral-500 font-medium mb-2">Total Transacciones</p>
          <p className="text-lg md:text-2xl font-bold text-white">{mockTransactions.length}</p>
        </div>
      </div>

      {/* Transactions Grouped by Month */}
      <div className="flex flex-col max-w-4xl space-y-8">
        {filteredAndGrouped.length > 0 ? (
          filteredAndGrouped.map((group) => (
            <div key={`${group.month}-${group.year}`}>
              {/* Month Header */}
              <h3 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wider">
                {group.month} {group.year}
              </h3>

              {/* Transactions for this month */}
              <div className="space-y-2">
                {group.transactions.map((transaction, i) => {
                  const isEarn = transaction.type === 'earn';
                  const color = isEarn ? 'text-emerald-500' : 'text-red-400';
                  const icon = isEarn ? ArrowDownLeft : ArrowUpRight;
                  const Icon = icon;
                  const iconBg = isEarn ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-400';

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-4 md:py-5 px-4 md:px-5 glass-panel rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all animate-fade-in"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1">
                        <div
                          className={`w-8 md:w-10 h-8 md:h-10 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon size={16} className="md:hidden" />
                          <Icon size={18} className="hidden md:block" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm md:text-base font-medium text-white truncate">
                            {transaction.item || (isEarn ? 'Puntos ganados' : 'Canjeado')}
                          </p>
                          <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                            {transaction.shop} • {transaction.date}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm md:text-base font-semibold ${color} tracking-tight flex-shrink-0 ml-4`}>
                        {transaction.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search size={32} className="text-muted-foreground/60 mb-4" />
            <p className="text-muted-foreground text-sm">
              No encontramos transacciones que coincidan con tu búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
