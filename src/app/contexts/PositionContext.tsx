import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { getPosition } from '../utils/ocr';
import { usePersistentState } from '../utils/storage';
import { NEW_WORLD_CLASS_ID, useRunningGameInfo } from '../utils/games';

type PositionContextProps = {
  position: [number, number] | null;
  tracking: boolean;
  following: boolean;
  toggleTracking: () => void;
  toggleFollowing: () => void;
};
const PositionContext = createContext<PositionContextProps>({
  position: null,
  tracking: false,
  following: true,
  toggleTracking: () => undefined,
  toggleFollowing: () => undefined,
});

type PositionProviderProps = {
  children: ReactNode;
};

export function PositionProvider({
  children,
}: PositionProviderProps): JSX.Element {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [tracking, setTracking] = usePersistentState<boolean>(
    'tracking',
    false
  );
  const [following, setFollowing] = usePersistentState<boolean>(
    'following',
    false
  );
  const gameInfo = useRunningGameInfo({
    gameChanged: false,
    focusChanged: true,
  });

  useEffect(() => {
    if (
      !tracking ||
      !gameInfo ||
      gameInfo.classId !== NEW_WORLD_CLASS_ID ||
      !gameInfo.isInFocus
    ) {
      return;
    }
    let handler = setTimeout(updatePosition, 0);
    let active = true;
    async function updatePosition() {
      try {
        const position = await getPosition();
        setPosition(position);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          handler = setTimeout(updatePosition, 0);
        }
      }
    }

    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [tracking, gameInfo]);

  function toggleTracking() {
    setTracking(!tracking);
  }

  function toggleFollowing() {
    setFollowing(!following);
  }
  return (
    <PositionContext.Provider
      value={{ position, tracking, following, toggleTracking, toggleFollowing }}
    >
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition(): PositionContextProps {
  return useContext(PositionContext);
}
