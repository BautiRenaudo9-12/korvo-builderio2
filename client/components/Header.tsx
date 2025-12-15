import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Bird } from 'lucide-react';

interface HeaderProps {
  isDetailRoute: boolean;
  onBack: () => void;
}

export const Header = ({ isDetailRoute, onBack }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="md:hidden pt-6 pb-2 px-6 flex justify-between items-center z-20 bg-red backdrop-blur-sm sticky top-0 transition-all duration-300">
      {isDetailRoute ? (
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/5 transition-colors flex items-center gap-1 text-neutral-400 hover:text-white"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
          <span className="text-sm font-medium">Volver</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary-20">
            <Bird size={18} className="text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-lg font-semibold tracking-tighter text-white">KORVO</h1>
        </div>
      )}

      {isDetailRoute && <div />}

      <button
        onClick={() => navigate('/profile')}
        className="relative p-2 rounded-full hover:bg-white/5 transition-colors group"
      >
        <User size={20} className="text-neutral-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
      </button>
    </header>
  );
};
