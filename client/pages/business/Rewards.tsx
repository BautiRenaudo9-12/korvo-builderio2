import { useState } from 'react';
import { mockRewards } from '@/lib/business-data';
import { Plus, Edit2, Trash2, Toggle2 } from 'lucide-react';

interface EditingReward {
  id: string;
  name: string;
  description: string;
  cost: number;
  active: boolean;
}

export default function BusinessRewards() {
  const [rewards, setRewards] = useState(mockRewards);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditingReward | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (reward: (typeof mockRewards)[0]) => {
    setEditingId(reward.id);
    setFormData({
      id: reward.id,
      name: reward.name,
      description: reward.description,
      cost: reward.cost,
      active: reward.active,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setRewards(rewards.filter((r) => r.id !== id));
  };

  const handleToggle = (id: string) => {
    setRewards(
      rewards.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
  };

  const handleSave = () => {
    if (!formData) return;

    if (editingId) {
      setRewards(
        rewards.map((r) =>
          r.id === editingId
            ? {
                ...r,
                name: formData.name,
                description: formData.description,
                cost: formData.cost,
                active: formData.active,
              }
            : r
        )
      );
    } else {
      setRewards([
        ...rewards,
        {
          id: `new-${Date.now()}`,
          name: formData.name,
          description: formData.description,
          cost: formData.cost,
          category: '',
          active: formData.active,
          redeemCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(null);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      cost: 0,
      active: true,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="px-4 md:px-8 pt-4 md:pt-8 pb-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Recompensas</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors"
        >
          <Plus size={18} />
          Nueva Recompensa
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/80 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? 'Editar Recompensa' : 'Nueva Recompensa'}
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData?.name || ''}
                  onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="Ej: Café Gratis"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Descripción</label>
                <textarea
                  value={formData?.description || ''}
                  onChange={(e) => setFormData({ ...formData!, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 min-h-20 resize-none"
                  placeholder="Ej: Taza de café americano o capuchino"
                />
              </div>

              {/* Cost */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Costo (Puntos)</label>
                <input
                  type="number"
                  value={formData?.cost || 0}
                  onChange={(e) => setFormData({ ...formData!, cost: parseInt(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="300"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white font-medium">Activa</span>
                <button
                  onClick={() => setFormData({ ...formData!, active: !formData?.active })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData?.active
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : 'bg-white/5 text-neutral-400 border border-white/10'
                  }`}
                >
                  {formData?.active ? 'Sí' : 'No'}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-colors font-semibold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block">
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
                      <span className="text-amber-400 font-semibold">{reward.cost} pts</span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className="text-white font-medium">{reward.redeemCount}</span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <button
                        onClick={() => handleToggle(reward.id)}
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
                          onClick={() => handleEdit(reward)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-amber-500 hover:text-amber-400"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(reward.id)}
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
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {rewards.map((reward, index) => (
          <div
            key={reward.id}
            className="glass-panel rounded-lg p-4 border border-white/5 hover:border-white/10 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {/* Header with name and actions */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-3">
                <h3 className="text-white font-semibold text-base">{reward.name}</h3>
                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{reward.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(reward)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-amber-500 hover:text-amber-400"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(reward.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500 hover:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-neutral-500 mb-2">Costo</p>
                <p className="text-amber-400 font-bold text-lg">{reward.cost}</p>
                <p className="text-xs text-neutral-600">puntos</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-neutral-500 mb-2">Canjeadas</p>
                <p className="text-white font-bold text-lg">{reward.redeemCount}</p>
              </div>
            </div>

            {/* Status */}
            <button
              onClick={() => handleToggle(reward.id)}
              className={`w-full px-3 py-3 rounded-lg font-semibold transition-all text-sm ${
                reward.active
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-neutral-500/20 text-neutral-400 border border-neutral-500/30'
              }`}
            >
              {reward.active ? '✓ Activa' : '○ Inactiva'}
            </button>
          </div>
        ))}

        {rewards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-400 text-sm">No hay recompensas creadas</p>
          </div>
        )}
      </div>

      {/* Empty State - Desktop */}
      {rewards.length === 0 && (
        <div className="hidden md:block text-center py-12">
          <p className="text-neutral-400 text-sm">No hay recompensas creadas</p>
        </div>
      )}
    </div>
  );
}
