import { useCallback, useEffect, useState } from 'react';
import { fetchJSON } from './utils/api';

export type Marker = {
  type: string;
  position: [number, number, number];
  _id: string;
};
function useMarkers(): { markers: Marker[]; refresh: () => void } {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const refresh = useCallback(() => {
    fetchJSON<Marker[]>('/api/markers').then(setMarkers);
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return { markers, refresh };
}

export default useMarkers;
