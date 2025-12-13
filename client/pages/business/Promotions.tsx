import { useState } from 'react';
import { mockPromotions } from '@/lib/business-data';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';

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

export default function BusinessPromotions() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EditingPromotion | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (promo: (typeof mockPromotions)[0]) => {
    setEditingId(promo.id);
    setFormData({
      id: promo.id,
      title: promo.title,
      description: promo.description,
      discount: promo.discount,
      type: promo.type,
      startDate: promo.startDate,
      endDate: promo.endDate,
      active: promo.active,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!formData) return;

    if (editingId) {
      setPromotions(
        promotions.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      );
    } else {
      setPromotions([
        ...promotions,
        {
          id: `promo-${Date.now()}`,
          ...formData,
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
      title: '',
      description: '',
      discount: 0,
      type: 'percentage',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      active: true,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(null);
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      percentage: '% Descuento',
      fixed: 'Descuento Fijo',
      'bonus-points': 'Puntos Bonus',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const isActive = (startDate: string, endDate: string, status: boolean) => {
    if (!status) return false;
    const today = new Date().toISOString().split('T')[0];
    return today >= startDate && today <= endDate;
  };

  return (
    <div className="px-3 sm:px-4 md:px-8 pt-3 sm:pt-4 md:pt-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Promociones</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Nueva Promoción</span>
          <span className="sm:hidden">Agregar</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/80 flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-panel rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? 'Editar Promoción' : 'Nueva Promoción'}
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Título</label>
                <input
                  type="text"
                  value={formData?.title || ''}
                  onChange={(e) => setFormData({ ...formData!, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="Ej: Descuento Black Friday"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Descripción</label>
                <textarea
                  value={formData?.description || ''}
                  onChange={(e) => setFormData({ ...formData!, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 min-h-20 resize-none"
                  placeholder="Detalles de la promoción"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Tipo</label>
                <select
                  value={formData?.type || 'percentage'}
                  onChange={(e) => setFormData({ ...formData!, type: e.target.value as any })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                >
                  <option value="percentage">% Descuento</option>
                  <option value="fixed">Descuento Fijo</option>
                  <option value="bonus-points">Puntos Bonus</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  {formData?.type === 'percentage' ? 'Porcentaje (%)' : formData?.type === 'fixed' ? 'Monto ($)' : 'Puntos'}
                </label>
                <input
                  type="number"
                  value={formData?.discount || 0}
                  onChange={(e) => setFormData({ ...formData!, discount: parseInt(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="0"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Fecha Inicio</label>
                  <input
                    type="date"
                    value={formData?.startDate || ''}
                    onChange={(e) => setFormData({ ...formData!, startDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Fecha Fin</label>
                  <input
                    type="date"
                    value={formData?.endDate || ''}
                    onChange={(e) => setFormData({ ...formData!, endDate: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  />
                </div>
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

      {/* Promotions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {promotions.map((promo, index) => {
          const active = isActive(promo.startDate, promo.endDate, promo.active);

          return (
            <div
              key={promo.id}
              className="glass-panel rounded-lg p-3 sm:p-4 md:p-6 border border-white/5 hover:border-white/10 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 break-words">{promo.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2">{promo.description}</p>
                </div>
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(promo)}
                    className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors text-amber-500"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Type and Value */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                <span className="px-2 sm:px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-neutral-300 whitespace-nowrap">
                  {getTypeLabel(promo.type)}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-amber-400">
                  {promo.type === 'percentage' ? `${promo.discount}%` : promo.type === 'fixed' ? `$${promo.discount}` : `+${promo.discount}`}
                </span>
              </div>

              {/* Dates */}
              <div className="flex items-start gap-2 text-xs text-neutral-500 mb-3 sm:mb-4">
                <Calendar size={14} className="flex-shrink-0 mt-0.5" />
                <span className="break-words">
                  {promo.startDate} hasta {promo.endDate}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex gap-2">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    active
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-neutral-500/20 text-neutral-400'
                  }`}
                >
                  {active ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {promotions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400 text-sm">No hay promociones creadas</p>
        </div>
      )}
    </div>
  );
}
