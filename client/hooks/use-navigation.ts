import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useNavigation = () => {
  const navFn = useNavigate();

  const navigate = useCallback((path: string) => navFn(path), [navFn]);
  const goToHome = useCallback(() => navFn('/'), [navFn]);
  const goToWallet = useCallback(() => navFn('/wallet'), [navFn]);
  const goToExplore = useCallback(() => navFn('/explore'), [navFn]);
  const goToProfile = useCallback(() => navFn('/profile'), [navFn]);
  const goToActivity = useCallback(() => navFn('/activity'), [navFn]);
  const goToBusinessDetail = useCallback((id: number) => navFn(`/wallet/${id}`), [navFn]);
  const goToAllBusinesses = useCallback(() => navFn('/wallet'), [navFn]);

  return {
    navigate,
    goToHome,
    goToWallet,
    goToExplore,
    goToProfile,
    goToActivity,
    goToBusinessDetail,
    goToAllBusinesses,
  };
};
