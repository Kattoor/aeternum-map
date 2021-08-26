import type { ReactNode } from 'react';
import { createContext, useEffect, useState, useContext } from 'react';
import { getPosition } from '../utils/ocr';

type PositionContextProps = {
  position: [number, number] | null;
  tracking: boolean;
  toggleTracking: () => void;
};
const PositionContext = createContext<PositionContextProps>({
  position: null,
  tracking: false,
  toggleTracking: () => undefined,
});

type PositionProviderProps = {
  children: ReactNode;
};

export function PositionProvider({
  children,
}: PositionProviderProps): JSX.Element {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) {
      return;
    }
    const intervalId = setInterval(async () => {
      try {
        const position = await getPosition();
        setPosition(position);
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [tracking]);

  function toggleTracking() {
    setTracking(!tracking);
  }
  return (
    <PositionContext.Provider value={{ position, tracking, toggleTracking }}>
      {children}
    </PositionContext.Provider>
  );
}

export function usePosition(): PositionContextProps {
  return useContext(PositionContext);
}
