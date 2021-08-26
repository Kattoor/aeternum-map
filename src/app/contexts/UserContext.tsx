import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import type { User } from '../../types';
import { fetchJSON } from '../utils/api';
import { getCurrentUser } from '../utils/profile';

const UserContext = createContext<User | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        const result = await fetchJSON('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: currentUser.username,
            displayName: currentUser.displayName,
            avatar: currentUser.avatar,
          }),
        });
        setUser(result as User);
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();

    overwolf.profile.onLoginStateChanged.addListener(loadUser);
    return () => {
      overwolf.profile.onLoginStateChanged.removeListener(loadUser);
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): User | null {
  return useContext(UserContext);
}
