import leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import { usePosition } from '../../contexts/PositionContext';
import { LeafIcon } from './useLayerGroups';

function usePlayerPosition({
  leafletMap,
}: {
  leafletMap: leaflet.Map | null;
}): void {
  const { position, following } = usePosition();
  const [marker, setMarker] = useState<leaflet.Marker | null>(null);

  useEffect(() => {
    if (!leafletMap || marker) {
      return;
    }
    const icon = new LeafIcon({ iconUrl: '/player.webp' });
    const newMarker = leaflet.marker([0, 0], { icon }).addTo(leafletMap);
    setMarker(newMarker);
  }, [leafletMap, marker]);

  useEffect(() => {
    if (!marker || !position || !leafletMap) {
      return;
    }
    marker.setLatLng(position);
    if (following) {
      leafletMap.setView([position[1], position[0]]);
    }
  }, [marker, leafletMap, position, following]);
}

export default usePlayerPosition;
