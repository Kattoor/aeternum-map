import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { fetchJSON } from '../utils/api';
import { getCurrentUser } from '../utils/profile';

export type User = {
  username: string;
  displayName: string;
  avatar: string;
  hiddenMarkerIds: string[];
  createdAt: Date;
};
type UserContextValue = {
  user: User | null;
  refresh: () => void;
};
const UserContext = createContext<UserContextValue>({
  user: null,
  refresh: () => undefined,
});

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

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
  useEffect(() => {
    loadUser();
    overwolf.profile.onLoginStateChanged.addListener(loadUser);
    return () => {
      overwolf.profile.onLoginStateChanged.removeListener(loadUser);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, refresh: loadUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): User | null {
  return useContext(UserContext).user;
}

export function useRefreshUser(): () => void {
  return useContext(UserContext).refresh;
}
