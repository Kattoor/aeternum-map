import { useCallback, useEffect, useState } from 'react';

export type Marker = {
  type: string;
  position: [number, number];
  _id: string;
};
function useMarkers(): { markers: Marker[]; refresh: () => void } {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const refresh = useCallback(() => {
    fetch('/api/markers')
      .then((response) => response.json())
      .then(setMarkers);
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return { markers, refresh };
}

export default useMarkers;
