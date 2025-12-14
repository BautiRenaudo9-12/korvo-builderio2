import { lazy, Suspense } from 'react';
import { Shop } from '@/types';
import { Navigation, AlertCircle } from 'lucide-react';

interface ExploreMapProps {
  shops: Shop[];
}

const MapContent = lazy(() => import('./MapContent').then(m => ({ default: m.MapContent })));

export const ExploreMap = ({ shops }: ExploreMapProps) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-3 border border-violet-500/20">
              <Navigation size={20} className="text-violet-500 animate-pulse" />
            </div>
            <p className="text-sm text-neutral-500">Cargando mapa...</p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl relative group">
        <MapContent shops={shops} />

        {/* Bottom Info Card */}
        <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-lg p-3 md:p-4 border border-white/5 pointer-events-none">
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-violet-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-neutral-400">
              Habilita tu ubicación para ver los negocios cercanos
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
