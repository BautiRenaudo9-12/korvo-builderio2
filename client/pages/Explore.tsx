import { mockExploreShops } from '@/lib/data';
import { ExploreMap } from '@/components/ExploreMap';

export default function Explore() {
  return (
    <div className="w-full px-6 md:px-8 pt-4 md:pt-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">Explorar Tiendas</h2>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl">
          Descubre los negocios aliados más cercanos a tu ubicación
        </p>
      </div>

      {/* Map Container */}
      <div className="w-full h-96 md:h-[600px] rounded-2xl overflow-hidden">
        <ExploreMap shops={mockExploreShops} />
      </div>

      {/* Info Card - Mobile Only */}
      <div className="mt-4 md:hidden glass-panel p-4 rounded-xl border border-white/5">
        <p className="text-xs text-neutral-500 text-center">
          Habilita tu ubicación en los ajustes del navegador para ver los negocios cercanos
        </p>
      </div>
    </div>
  );
}
