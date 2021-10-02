import leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import { usePosition } from '../../contexts/PositionContext';
import { LeafIcon } from './useLayerGroups';

function usePlayerPosition({
  leafletMap,
}: {
  leafletMap: leaflet.Map | null;
}): void {
  const { position, following, tracking } = usePosition();
  const [marker, setMarker] = useState<leaflet.Marker | null>(null);

  useEffect(() => {
    if (!leafletMap || marker || !position) {
      return;
    }
    const icon = new LeafIcon({ iconUrl: '/player.webp' });
    const newMarker = leaflet.marker([0, 0], { icon });
    setMarker(newMarker);
  }, [leafletMap, marker, position]);

  useEffect(() => {
    if (!marker || !position || !leafletMap) {
      return;
    }
    marker.setLatLng(position);
    if (following) {
      leafletMap.setView([position[0], position[1]]);
    }
  }, [marker, leafletMap, position, following]);

  useEffect(() => {
    if (!marker || !leafletMap) {
      return;
    }
    if (tracking) {
      marker.addTo(leafletMap);
    } else {
      marker.removeFrom(leafletMap);
    }
  }, [marker, tracking, leafletMap]);
}

export default usePlayerPosition;
