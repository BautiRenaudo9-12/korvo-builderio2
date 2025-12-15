import { useState, useMemo } from 'react';
import { mockCustomers } from '@/lib/business-data';
import { Search, TrendingUp } from 'lucide-react';

export default function BusinessCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'points' | 'visits' | 'spent'>('points');

  const filtered = useMemo(() => {
    let result = mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    );

    result.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.points - a.points;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'visits':
          return b.stamps - a.stamps;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, sortBy]);

  const totalCustomers = mockCustomers.length;
  const totalPointsInCirculation = mockCustomers.reduce((sum, c) => sum + c.points, 0);
  const activeThisMonth = mockCustomers.filter((c) => c.lastVisit.includes('Ayer') || c.lastVisit.includes('días')).length;

  return (
    <div className="px-4 md:px-8 pt-4 md:pt-8 pb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Clientes</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5">
          <p className="text-muted-foreground text-xs md:text-sm mb-2">Total de Clientes</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{totalCustomers}</p>
        </div>
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5">
          <p className="text-muted-foreground text-xs md:text-sm mb-2">Puntos en Circulación</p>
          <p className="text-2xl md:text-3xl font-bold text-primary/80">{totalPointsInCirculation.toLocaleString()}</p>
        </div>
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5">
          <p className="text-muted-foreground text-xs md:text-sm mb-2">Activos este mes</p>
          <p className="text-2xl md:text-3xl font-bold text-emerald-500">{activeThisMonth}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['points', 'spent', 'visits'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                sortBy === option
                  ? 'bg-primary-20 border border-primary-50 text-primary-400'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {option === 'points' && 'Más Puntos'}
              {option === 'spent' && 'Mayor Gasto'}
              {option === 'visits' && 'Más Visitas'}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="glass-panel rounded-lg border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                  Cliente
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                  Contacto
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                  Puntos
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                  Sellos
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                  Gasto Total
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                  Última Visita
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="px-4 md:px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{customer.name}</p>
                      <p className="text-xs text-neutral-500">Desde {customer.joinedAt}</p>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      <p>{customer.email}</p>
                      <p>{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-primary-400 font-bold text-lg">{customer.points}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-white font-medium">
                        {customer.stamps}/{customer.totalStamps}
                      </p>
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-400 rounded-full"
                          style={{
                            width: `${(customer.stamps / customer.totalStamps) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-white font-semibold">${customer.totalSpent.toLocaleString()}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-xs text-neutral-500">{customer.lastVisit}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto mb-4 text-muted-foreground/60" size={32} />
            <p className="text-muted-foreground text-sm">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
