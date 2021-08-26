import leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import { usePosition } from '../../contexts/PositionContext';
import { LeafIcon } from './useLayerGroups';

function usePlayerPosition({
  leafletMap,
}: {
  leafletMap: leaflet.Map | null;
}): void {
  const { position } = usePosition();
  const [marker, setMarker] = useState<leaflet.Marker | null>(null);

  useEffect(() => {
    if (!leafletMap) {
      return;
    }
    const icon = new LeafIcon({ iconUrl: '/player.webp' });
    const marker = leaflet.marker([0, 0], { icon }).addTo(leafletMap);
    setMarker(marker);
  }, [leafletMap, position]);

  useEffect(() => {
    if (!marker || !position) {
      return;
    }
    marker.setLatLng(position);
  }, [marker, position]);
}

export default usePlayerPosition;
