import { useNavigation } from '@/hooks/use-navigation';
import { mockWalletCards } from '@/lib/data';
import { ChevronRight, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { AllBusinesses } from '@/client/pages/AllBusinesses.tsx';

export default function Wallet() {
  const { goToBusinessDetail } = useNavigation();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <AllBusinesses />
  );
}
