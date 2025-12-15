import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Gift, Zap, BarChart3 } from 'lucide-react';
import { mockBusinessStats, mockChartData, mockTransactionsLog } from '@/lib/business-data';

export default function BusinessDashboard() {
  const stats = mockBusinessStats;
  const chartData = mockChartData;
  const recentTx = mockTransactionsLog.slice(0, 5);

  return (
    <div className="px-4 md:px-8 pt-4 md:pt-8 pb-8">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        {/* Total Points */}
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-primary-20 flex items-center justify-center">
              <Zap size={18} className="text-primary" />
            </div>
            <span className="text-xs text-success font-semibold">+12%</span>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm mb-1">Puntos en Circulación</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.totalPoints.toLocaleString()}</p>
        </div>

        {/* Active Customers */}
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-info-20 flex items-center justify-center">
              <Users size={18} className="text-info" />
            </div>
            <span className="text-xs text-success font-semibold">+8%</span>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm mb-1">Clientes Activos</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.activeCustomers}</p>
        </div>

        {/* Rewards Claimed */}
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-primary-20 flex items-center justify-center">
              <Gift size={18} className="text-primary" />
            </div>
            <span className="text-xs text-success font-semibold">+15%</span>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm mb-1">Recompensas Canjeadas</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.rewardsClaimed}</p>
        </div>

        {/* Monthly Revenue */}
        <div className="glass-panel rounded-lg p-4 md:p-6 border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg bg-success-20 flex items-center justify-center">
              <TrendingUp size={18} className="text-success" />
            </div>
            <span className="text-xs text-success font-semibold">+5%</span>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm mb-1">Ingresos (Mes)</p>
          <p className="text-2xl md:text-3xl font-bold text-white">${(stats.monthlyRevenue / 1000).toFixed(1)}K</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Points Chart */}
        <div className="glass-panel rounded-lg p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-white">Puntos (Ganados vs Canjeados)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.1)" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground) / 0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="hsl(var(--foreground) / 0.5)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background) / 0.8)',
                  border: '1px solid hsl(var(--foreground) / 0.2)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="earned" fill="hsl(var(--accent) / 0.6)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="redeemed" fill="hsl(var(--destructive) / 0.8)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="glass-panel rounded-lg p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={20} className="text-success" />
            <h3 className="text-lg font-semibold text-white">Ingresos Mensuales</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.1)" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground) / 0.5)" style={{ fontSize: '12px' }} />
              <YAxis stroke="hsl(var(--foreground) / 0.5)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background) / 0.8)',
                  border: '1px solid hsl(var(--foreground) / 0.2)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-panel rounded-lg p-6 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-6">Transacciones Recientes</h3>
        <div className="space-y-3 max-w-2xl">
          {recentTx.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium truncate">{tx.customerName}</p>
                <p className="text-xs text-neutral-500">
                  {tx.reward ? `Canjeó: ${tx.reward}` : 'Puntos ganados'} • {tx.date} {tx.time}
                </p>
              </div>
              <span
                className={`text-sm font-semibold flex-shrink-0 ml-4 ${
                  tx.type === 'earn' ? 'text-emerald-500' : 'text-red-400'
                }`}
              >
                {tx.type === 'earn' ? '+' : '-'}{tx.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
