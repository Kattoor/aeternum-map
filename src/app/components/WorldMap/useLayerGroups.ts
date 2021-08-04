import { useEffect } from 'react';
import leaflet from 'leaflet';
import { Marker } from '../../useMarkers';
import { mapFilters, FilterItem } from '../MapFilter/MapFilter';

const LeafIcon: new ({ iconUrl }: { iconUrl: string }) => leaflet.Icon =
  leaflet.Icon.extend({
    options: {
      iconSize: [64, 64],
      iconAnchor: [32, 32],
      tooltipAnchor: [0, -32],
    },
  });

function useLayerGroups({
  filters,
  leafletMap,
  markers,
  onMarkerClick,
}: {
  filters: string[];
  leafletMap: leaflet.Map | null;
  markers: Marker[];
  onMarkerClick: ({
    marker,
    filterItem,
  }: {
    marker: Marker;
    filterItem: FilterItem;
  }) => void;
}): void {
  useEffect(() => {
    if (!leafletMap || !leafletMap.getPane('markerPane') || !markers.length) {
      return;
    }

    const layerGroups: leaflet.LayerGroup[] = [];
    filters.map((filter) => {
      const mapFilter = mapFilters.find(
        (mapFilter) => mapFilter.value === filter
      );
      if (!mapFilter) {
        console.warn(`No markers for filter ${filter}`);
        return;
      }
      mapFilter.items.map((filterItem) => {
        const markersOfType = markers.filter(
          (marker) => marker.type === filterItem.type
        );
        const icon = new LeafIcon({ iconUrl: filterItem.iconUrl });

        const layerGroup = new leaflet.LayerGroup(
          markersOfType.map((markerOfType) => {
            const marker = leaflet
              .marker(markerOfType.position, {
                icon,
              })
              .bindTooltip(filterItem.title, { direction: 'top' });
            marker.on('click', () => {
              onMarkerClick({ marker: markerOfType, filterItem: filterItem });
            });
            return marker;
          })
        );
        layerGroups.push(layerGroup);
      });
    });

    layerGroups.forEach((marker) => marker.addTo(leafletMap));

    return () => {
      layerGroups.forEach((marker) => leafletMap.removeLayer(marker));
    };
  }, [filters, leafletMap, markers]);
}

export default useLayerGroups;
