import leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import { usePosition } from '../../contexts/PositionContext';
import { LeafIcon } from './useLayerGroups';

function usePlayerPosition({
  leafletMap,
  alwaysFollowing,
}: {
  leafletMap: leaflet.Map | null;
  alwaysFollowing?: boolean;
}): void {
  const { position, following } = usePosition();
  const [marker, setMarker] = useState<leaflet.Marker | null>(null);

  useEffect(() => {
    if (!leafletMap || marker || !position) {
      return;
    }
    const icon = new LeafIcon({ iconUrl: '/player.webp' });
    const newMarker = leaflet.marker([0, 0], { icon, zIndexOffset: 9000 });
    newMarker.addTo(leafletMap);
    setMarker(newMarker);
  }, [leafletMap, marker, position]);

  const isFollowing = alwaysFollowing || following;
  useEffect(() => {
    if (!marker || !position || !leafletMap) {
      return;
    }
    marker.setLatLng(position);
    if (isFollowing) {
      leafletMap.setView([position[0], position[1]]);
    }
  }, [marker, leafletMap, position, isFollowing]);
}

export default usePlayerPosition;
