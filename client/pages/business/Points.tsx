import { useState } from 'react';

interface PointsConfig {
  pointsPerDollar: number;
  expiryMonths: number;
}

export default function BusinessPoints() {
  const [pointsConfig, setPointsConfig] = useState<PointsConfig>({
    pointsPerDollar: 1,
    expiryMonths: 12,
  });
  const [pointsConfigEditing, setPointsConfigEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  const handleSaveConfig = () => {
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 3000);
    setPointsConfigEditing(false);
  };

  return (
    <div className="px-3 sm:px-4 md:px-8 pt-3 sm:pt-4 md:pt-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">Configuración de Puntos</h1>
          <p className="text-neutral-400 text-xs sm:text-sm">Define cómo ganan puntos tus clientes</p>
        </div>
      </div>

      <div className="glass-panel rounded-lg p-4 sm:p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">Parámetros de Puntos</h2>
            <p className="text-xs sm:text-sm text-neutral-400">Configura las reglas de acumulación y expiración</p>
          </div>
          <button
            onClick={() => setPointsConfigEditing(!pointsConfigEditing)}
            className="px-3 py-2 sm:px-4 bg-primary-20 text-primary border border-primary-30 rounded-lg hover:bg-primary-20 transition-colors font-medium text-xs sm:text-sm whitespace-nowrap"
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
              onClick={handleSaveConfig}
              className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-black rounded-lg transition-colors font-semibold"
            >
              Guardar Configuración
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs sm:text-sm text-neutral-400 mb-2">Ratio de Puntos</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{pointsConfig.pointsPerDollar}</p>
              <p className="text-xs text-neutral-500 mt-2">puntos por $1</p>
            </div>
            <div className="p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs sm:text-sm text-neutral-400 mb-2">Expiración</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{pointsConfig.expiryMonths}</p>
              <p className="text-xs text-neutral-500 mt-2">meses de inactividad</p>
            </div>
          </div>
        )}
      </div>

      {saveMessage && (
        <div className="fixed bottom-4 right-4 px-4 py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg animate-fade-in">
          ✓ Configuración guardada
        </div>
      )}
    </div>
  );
}
