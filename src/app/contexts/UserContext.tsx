import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { fetchJSON } from '../utils/api';
import { addGameLogListener, removeGameLogListener } from '../utils/extensions';
import { usePersistentState } from '../utils/storage';

export type User = {
  username: string;
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
  const [username, setUsername] = usePersistentState<string | null>(
    'username',
    null
  );

  async function loadUser(): Promise<void> {
    try {
      if (!username) {
        return;
      }
      const result = await fetchJSON('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      });
      setUser(result as User);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    addGameLogListener({
      onPlayerNameChange: setUsername,
    });
    return () => {
      removeGameLogListener();
    };
  }, []);

  useEffect(() => {
    loadUser();
  }, [username]);

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
