import { useState } from 'react';
import { mockRewards, mockPromotions } from '@/lib/business-data';
import { Plus, Edit2, Trash2, Zap } from 'lucide-react';

interface EditingReward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  active: boolean;
}

interface EditingPromotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'bonus-points';
  startDate: string;
  endDate: string;
  active: boolean;
}

interface PointsConfig {
  pointsPerDollar: number;
  expiryMonths: number;
}

export default function BusinessBenefits() {
  const [activeTab, setActiveTab] = useState<'points' | 'rewards' | 'promotions'>('points');
  const [rewards, setRewards] = useState(mockRewards);
  const [promotions, setPromotions] = useState(mockPromotions);
  const [pointsConfig, setPointsConfig] = useState<PointsConfig>({
    pointsPerDollar: 1,
    expiryMonths: 12,
  });
  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);
  const [rewardFormData, setRewardFormData] = useState<EditingReward | null>(null);
  const [showRewardForm, setShowRewardForm] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [promoFormData, setPromoFormData] = useState<EditingPromotion | null>(null);
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [pointsConfigEditing, setPointsConfigEditing] = useState(false);

  const tabs = [
    { id: 'points', label: 'Puntos', description: 'Configuración base: 1 punto por cada $X' },
    { id: 'rewards', label: 'Recompensas', description: 'Gestión de premios para canje' },
    { id: 'promotions', label: 'Promociones', description: 'Gestión de campañas temporales' },
  ] as const;

  // REWARDS HANDLERS
  const handleEditReward = (reward: (typeof mockRewards)[0]) => {
    setEditingRewardId(reward.id);
    setRewardFormData({
      id: reward.id,
      name: reward.name,
      description: reward.description,
      cost: reward.cost,
      category: reward.category,
      active: reward.active,
    });
    setShowRewardForm(true);
  };

  const handleDeleteReward = (id: string) => {
    setRewards(rewards.filter((r) => r.id !== id));
  };

  const handleToggleReward = (id: string) => {
    setRewards(
      rewards.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
  };

  const handleSaveReward = () => {
    if (!rewardFormData) return;

    if (editingRewardId) {
      setRewards(
        rewards.map((r) =>
          r.id === editingRewardId
            ? {
                ...r,
                name: rewardFormData.name,
                description: rewardFormData.description,
                cost: rewardFormData.cost,
                category: rewardFormData.category,
                active: rewardFormData.active,
              }
            : r
        )
      );
    } else {
      setRewards([
        ...rewards,
        {
          id: `new-${Date.now()}`,
          name: rewardFormData.name,
          description: rewardFormData.description,
          cost: rewardFormData.cost,
          category: rewardFormData.category,
          active: rewardFormData.active,
          redeemCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    }

    setShowRewardForm(false);
    setEditingRewardId(null);
    setRewardFormData(null);
  };

  const handleAddNewReward = () => {
    setEditingRewardId(null);
    setRewardFormData({
      id: '',
      name: '',
      description: '',
      cost: 0,
      category: '',
      active: true,
    });
    setShowRewardForm(true);
  };

  const handleCancelReward = () => {
    setShowRewardForm(false);
    setEditingRewardId(null);
    setRewardFormData(null);
  };

  // PROMOTIONS HANDLERS
  const handleEditPromo = (promo: (typeof mockPromotions)[0]) => {
    setEditingPromoId(promo.id);
    setPromoFormData({
      id: promo.id,
      title: promo.title,
      description: promo.description,
      discount: promo.discount,
      type: promo.type,
      startDate: promo.startDate,
      endDate: promo.endDate,
      active: promo.active,
    });
    setShowPromoForm(true);
  };

  const handleDeletePromo = (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  const handleSavePromo = () => {
    if (!promoFormData) return;

    if (editingPromoId) {
      setPromotions(
        promotions.map((p) =>
          p.id === editingPromoId ? { ...p, ...promoFormData } : p
        )
      );
    } else {
      setPromotions([
        ...promotions,
        {
          id: `promo-${Date.now()}`,
          ...promoFormData,
        },
      ]);
    }

    setShowPromoForm(false);
    setEditingPromoId(null);
    setPromoFormData(null);
  };

  const handleAddNewPromo = () => {
    setEditingPromoId(null);
    setPromoFormData({
      id: '',
      title: '',
      description: '',
      discount: 0,
      type: 'percentage',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: true,
    });
    setShowPromoForm(true);
  };

  const handleCancelPromo = () => {
    setShowPromoForm(false);
    setEditingPromoId(null);
    setPromoFormData(null);
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      percentage: '% Descuento',
      fixed: 'Descuento Fijo',
      'bonus-points': 'Puntos Bonus',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const isPromoActive = (startDate: string, endDate: string, status: boolean) => {
    if (!status) return false;
    const today = new Date().toISOString().split('T')[0];
    return today >= startDate && today <= endDate;
  };

  const categories = ['Bebidas', 'Alimentos', 'Combos', 'Promocionales', 'Otros'];

  return (
    <div className="px-4 md:px-8 pt-4 md:pt-8 pb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Gestionar Beneficios</h1>
      <p className="text-neutral-400 text-sm mb-8">Configura puntos, recompensas y promociones para tu negocio</p>

      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-8 border-b border-white/5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-2 md:px-4 font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* POINTS TAB */}
      {activeTab === 'points' && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel rounded-lg p-6 border border-white/5">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Configuración de Puntos</h2>
                <p className="text-sm text-neutral-400">Define cómo ganan puntos tus clientes</p>
              </div>
              <button
                onClick={() => setPointsConfigEditing(!pointsConfigEditing)}
                className="px-4 py-2 bg-primary-20 text-primary border border-primary-30 rounded-lg hover:bg-primary-20 transition-colors font-medium text-sm"
              >
                {pointsConfigEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            {pointsConfigEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Puntos por cada peso ($)</label>
                  <input
                    type="number"
                    value={pointsConfig.pointsPerDollar}
                    onChange={(e) =>
                      setPointsConfig({
                        ...pointsConfig,
                        pointsPerDollar: Math.max(0.1, parseFloat(e.target.value)),
                      })
                    }
                    step="0.1"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    placeholder="1"
                  />
                  <p className="text-xs text-neutral-500 mt-2">El cliente ganará {pointsConfig.pointsPerDollar} puntos por cada $1 gastado</p>
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Meses de expiración</label>
                  <input
                    type="number"
                    value={pointsConfig.expiryMonths}
                    onChange={(e) =>
                      setPointsConfig({
                        ...pointsConfig,
                        expiryMonths: Math.max(1, parseInt(e.target.value)),
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    placeholder="12"
                  />
                  <p className="text-xs text-neutral-500 mt-2">Los puntos expirarán después de {pointsConfig.expiryMonths} meses de inactividad</p>
                </div>

                <button
                  onClick={() => setPointsConfigEditing(false)}
                  className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-black rounded-lg transition-colors font-semibold"
                >
                  Guardar Configuración
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-neutral-400 mb-1">Ratio de Puntos</p>
                  <p className="text-3xl font-bold text-primary">{pointsConfig.pointsPerDollar}</p>
                  <p className="text-xs text-neutral-500 mt-2">puntos por $1</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-neutral-400 mb-1">Expiración</p>
                  <p className="text-3xl font-bold text-primary">{pointsConfig.expiryMonths}</p>
                  <p className="text-xs text-neutral-500 mt-2">meses de inactividad</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REWARDS TAB */}
      {activeTab === 'rewards' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddNewReward}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-black font-semibold rounded-lg transition-colors"
            >
              <Plus size={18} />
              Nueva Recompensa
            </button>
          </div>

          {/* Reward Form Modal */}
          {showRewardForm && (
            <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/80 flex items-center justify-center p-4 animate-fade-in">
              <div className="glass-panel rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">
                  {editingRewardId ? 'Editar Recompensa' : 'Nueva Recompensa'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={rewardFormData?.name || ''}
                      onChange={(e) => setRewardFormData({ ...rewardFormData!, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="Ej: Café Gratis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Descripción</label>
                    <textarea
                      value={rewardFormData?.description || ''}
                      onChange={(e) => setRewardFormData({ ...rewardFormData!, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-20 resize-none"
                      placeholder="Ej: Taza de café americano o capuchino"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Costo (Puntos)</label>
                    <input
                      type="number"
                      value={rewardFormData?.cost || 0}
                      onChange={(e) => setRewardFormData({ ...rewardFormData!, cost: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Categoría</label>
                    <select
                      value={rewardFormData?.category || ''}
                      onChange={(e) => setRewardFormData({ ...rewardFormData!, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      <option value="" disabled>
                        Seleccionar categoría
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-white font-medium">Activa</span>
                    <button
                      onClick={() => setRewardFormData({ ...rewardFormData!, active: !rewardFormData?.active })}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        rewardFormData?.active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-white/5 text-neutral-400 border border-white/10'
                      }`}
                    >
                      {rewardFormData?.active ? 'Sí' : 'No'}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handleCancelReward}
                    className="flex-1 px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveReward}
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-black rounded-lg transition-colors font-semibold"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rewards Table */}
          <div className="glass-panel rounded-lg border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Recompensa
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Costo
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Categoría
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Canjeadas
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Estado
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((reward, index) => (
                    <tr
                      key={reward.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{reward.name}</p>
                          <p className="text-xs text-neutral-500 line-clamp-1">{reward.description}</p>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-primary-400 font-semibold">{reward.cost} pts</span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-xs text-neutral-400">{reward.category}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-white font-medium">{reward.redeemCount}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <button
                          onClick={() => handleToggleReward(reward.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            reward.active
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-neutral-500/20 text-neutral-400'
                          }`}
                        >
                          {reward.active ? 'Activa' : 'Inactiva'}
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditReward(reward)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary hover:text-primary-400"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteReward(reward.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {rewards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-sm">No hay recompensas creadas</p>
            </div>
          )}
        </div>
      )}

      {/* PROMOTIONS TAB */}
      {activeTab === 'promotions' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleAddNewPromo}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-black font-semibold rounded-lg transition-colors"
            >
              <Plus size={18} />
              Nueva Promoción
            </button>
          </div>

          {/* Promo Form Modal */}
          {showPromoForm && (
            <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/80 flex items-center justify-center p-4 animate-fade-in">
              <div className="glass-panel rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">
                  {editingPromoId ? 'Editar Promoción' : 'Nueva Promoción'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Título</label>
                    <input
                      type="text"
                      value={promoFormData?.title || ''}
                      onChange={(e) => setPromoFormData({ ...promoFormData!, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="Ej: Doble Puntos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Descripción</label>
                    <textarea
                      value={promoFormData?.description || ''}
                      onChange={(e) => setPromoFormData({ ...promoFormData!, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50 min-h-20 resize-none"
                      placeholder="Ej: Gana el doble de puntos en todas las compras"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Tipo</label>
                    <select
                      value={promoFormData?.type || 'percentage'}
                      onChange={(e) => setPromoFormData({ ...promoFormData!, type: e.target.value as any })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      <option value="percentage">% Descuento</option>
                      <option value="fixed">Descuento Fijo</option>
                      <option value="bonus-points">Puntos Bonus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Cantidad</label>
                    <input
                      type="number"
                      value={promoFormData?.discount || 0}
                      onChange={(e) => setPromoFormData({ ...promoFormData!, discount: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                      placeholder="10"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">Fecha Inicio</label>
                      <input
                        type="date"
                        value={promoFormData?.startDate || ''}
                        onChange={(e) => setPromoFormData({ ...promoFormData!, startDate: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-400 mb-2">Fecha Fin</label>
                      <input
                        type="date"
                        value={promoFormData?.endDate || ''}
                        onChange={(e) => setPromoFormData({ ...promoFormData!, endDate: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-white font-medium">Activa</span>
                    <button
                      onClick={() => setPromoFormData({ ...promoFormData!, active: !promoFormData?.active })}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        promoFormData?.active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-white/5 text-neutral-400 border border-white/10'
                      }`}
                    >
                      {promoFormData?.active ? 'Sí' : 'No'}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handleCancelPromo}
                    className="flex-1 px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSavePromo}
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-black rounded-lg transition-colors font-semibold"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Promotions Table */}
          <div className="glass-panel rounded-lg border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Promoción
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Tipo
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Valor
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Vigencia
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Estado
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((promo, index) => (
                    <tr
                      key={promo.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{promo.title}</p>
                          <p className="text-xs text-neutral-500 line-clamp-1">{promo.description}</p>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-xs text-neutral-400">{getTypeLabel(promo.type)}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-primary-400 font-semibold">
                          {promo.discount}
                          {promo.type === 'percentage' && '%'}
                          {promo.type === 'bonus-points' && ' pts'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="text-xs text-neutral-400">
                          {promo.startDate} - {promo.endDate}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isPromoActive(promo.startDate, promo.endDate, promo.active)
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-neutral-500/20 text-neutral-400'
                          }`}
                        >
                          {isPromoActive(promo.startDate, promo.endDate, promo.active) ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPromo(promo)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-primary hover:text-primary-400"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePromo(promo.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {promotions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400 text-sm">No hay promociones creadas</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
