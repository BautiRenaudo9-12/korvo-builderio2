import { useState } from 'react';
import { mockBusinessProfile } from '@/lib/business-data';
import { Save, Upload } from 'lucide-react';

interface BusinessFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  category: string;
  description: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export default function BusinessSettings() {
  const [formData, setFormData] = useState<BusinessFormData>({
    name: mockBusinessProfile.name,
    email: mockBusinessProfile.email,
    phone: mockBusinessProfile.phone,
    address: mockBusinessProfile.address,
    city: mockBusinessProfile.city,
    category: mockBusinessProfile.category,
    description: mockBusinessProfile.description,
    openingHours: mockBusinessProfile.openingHours,
  });

  const [saved, setSaved] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setSaved(false);
  };

  const handleHourChange = (day: string, value: string) => {
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: value,
      },
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const days = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  const categories = ['Café', 'Restaurante', 'Panadería', 'Pizzería', 'Heladería', 'Tienda', 'Otro'];

  return (
    <div className="px-4 md:px-8 pt-4 md:pt-8 pb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Configuración del Negocio</h1>

      <div className="max-w-3xl">
        {/* Business Info Section */}
        <div className="glass-panel rounded-lg p-6 md:p-8 border border-white/5 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            📋 Información del Negocio
          </h2>

          <div className="space-y-6">
            {/* Logo/Cover Upload (Mock) */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Foto del Negocio</label>
              <div className="w-full h-32 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center hover:border-white/40 transition-colors bg-white/5 cursor-pointer group">
                <div className="text-center">
                  <Upload size={24} className="text-neutral-500 group-hover:text-white mx-auto mb-2" />
                  <p className="text-xs text-neutral-400">Haz clic para subir una imagen</p>
                </div>
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Nombre del Negocio</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none min-h-24"
                placeholder="Describe tu negocio..."
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Dirección</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="glass-panel rounded-lg p-6 md:p-8 border border-white/5 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            🕐 Horario de Atención
          </h2>

          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.key} className="flex items-center gap-4">
                <label className="text-white font-medium min-w-24">{day.label}</label>
                <input
                  type="text"
                  value={formData.openingHours[day.key as keyof typeof formData.openingHours]}
                  onChange={(e) => handleHourChange(day.key, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="Ej: 09:00 - 21:00"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-panel rounded-lg p-6 md:p-8 border border-red-500/20 bg-red-500/5 mb-6">
          <h2 className="text-xl font-semibold text-red-400 mb-4">⚠️ Zona de Peligro</h2>
          <p className="text-neutral-400 text-sm mb-4">
            Estas acciones no se pueden deshacer. Por favor, procede con cuidado.
          </p>
          <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors font-medium">
            Desactivar Negocio
          </button>
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-black rounded-lg transition-colors font-semibold flex-1"
          >
            <Save size={18} />
            Guardar Cambios
          </button>

          {saved && (
            <div className="absolute top-4 right-4 px-4 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 rounded-lg animate-fade-in">
              ✓ Cambios guardados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
