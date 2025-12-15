import { mockUser } from '@/lib/data';
import { ChevronRight, MessageCircleQuestion } from 'lucide-react';

export default function Profile() {
  return (
    <div className="px-6 md:px-8 pt-4 md:pt-8 pb-20 md:pb-8 animate-fade-in max-w-3xl">
      <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="w-16 md:w-24 h-16 md:h-24 rounded-full p-0.5 flex-shrink-0" style={{ backgroundImage: 'linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.8))' }}>
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
            <span className="text-xl md:text-4xl font-bold text-white">A</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-semibold text-white">{mockUser.name}</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{mockUser.email}</p>
          <span className="inline-block mt-2 px-3 py-1 md:px-4 md:py-1.5 rounded bg-primary-10 text-primary text-[10px] md:text-xs font-medium border border-primary-20">
            Miembro {mockUser.level}
          </span>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 md:mb-4 pl-1">
            Cuenta
          </h3>
          <div className="glass-panel rounded-xl overflow-hidden border border-white/5 p-0">
            <button className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5">
              <span className="text-sm md:text-base text-white">Editar Perfil</span>
              <ChevronRight size={16} className="text-muted-foreground md:hidden" />
              <ChevronRight size={20} className="text-muted-foreground hidden md:block" />
            </button>
            <button className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
              <span className="text-sm md:text-base text-white">Notificaciones</span>
              <ChevronRight size={16} className="text-muted-foreground md:hidden" />
              <ChevronRight size={20} className="text-muted-foreground hidden md:block" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 md:mb-4 pl-1">
            Seguridad
          </h3>
          <div className="glass-panel rounded-xl overflow-hidden border border-white/5 p-0">
            <button className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5">
              <span className="text-sm md:text-base text-white">Dispositivos</span>
              <ChevronRight size={16} className="text-muted-foreground md:hidden" />
              <ChevronRight size={20} className="text-muted-foreground hidden md:block" />
            </button>
            <button className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
              <span className="text-sm md:text-base text-white">Cambiar Contraseña</span>
              <ChevronRight size={16} className="text-muted-foreground md:hidden" />
              <ChevronRight size={20} className="text-muted-foreground hidden md:block" />
            </button>
          </div>
        </div>

        <div>
          <button className="w-full p-4 md:p-6 rounded-xl flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors text-left border border-white/5">
            <MessageCircleQuestion size={18} className="text-muted-foreground md:hidden" />
            <MessageCircleQuestion size={24} className="text-muted-foreground hidden md:block" />
            <div>
              <p className="text-sm md:text-base font-medium text-white">Ayuda y Soporte</p>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Contactar a Korvo</p>
            </div>
          </button>
        </div>

        <button
          onClick={() => alert('Cerrando sesión...')}
          className="w-full py-3 md:py-4 text-xs md:text-sm font-medium text-destructive transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
