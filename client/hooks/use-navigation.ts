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
  const goToStoreDetail = useCallback((id: number) => navFn(`/store/${id}`), [navFn]);
  const goToAllBusinesses = useCallback(() => navFn('/businesses'), [navFn]);

  return {
    navigate,
    goToHome,
    goToWallet,
    goToExplore,
    goToProfile,
    goToActivity,
    goToStoreDetail,
    goToAllBusinesses,
  };
};
