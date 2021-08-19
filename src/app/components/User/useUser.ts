import { useEffect, useState } from 'react';
import { CurrentUser, getCurrentUser } from '../../utils/profile';

function useUser(): {
  user: CurrentUser | null;
  isLoading: boolean;
} {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();

    overwolf.profile.onLoginStateChanged.addListener(loadUser);
    return () => {
      overwolf.profile.onLoginStateChanged.removeListener(loadUser);
    };
  }, []);

  return { user, isLoading };
}

export default useUser;
