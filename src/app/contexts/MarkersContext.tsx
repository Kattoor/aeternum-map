import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchJSON } from '../utils/api';

export type Marker = {
  type: string;
  position: [number, number, number];
  name?: string;
  _id: string;
};

type MarkersContextProps = { markers: Marker[]; refresh: () => void };
const MarkersContext = createContext<MarkersContextProps>({
  markers: [],
  refresh: () => undefined,
});

type MarkersProviderProps = {
  children: ReactNode;
};

export function MarkersProvider({
  children,
}: MarkersProviderProps): JSX.Element {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const refresh = useCallback(() => {
    fetchJSON<Marker[]>('/api/markers').then(setMarkers);
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <MarkersContext.Provider value={{ markers, refresh }}>
      {children}
    </MarkersContext.Provider>
  );
}

export function useMarkers(): MarkersContextProps {
  return useContext(MarkersContext);
}
