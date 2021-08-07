import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { Marker } from '../../useMarkers';
import { FilterItem, mapFilters } from '../MapFilter/mapFilters';
import { useURL } from '../Router/Router';

const LeafIcon: new ({ iconUrl }: { iconUrl: string }) => leaflet.Icon =
  leaflet.Icon.extend({
    options: {
      iconSize: [64, 64],
      iconAnchor: [32, 32],
      tooltipAnchor: [0, -32],
    },
  });

function useLayerGroups({
  leafletMap,
  markers,
  onMarkerClick,
}: {
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
  const url = useURL();

  const filters = (url.searchParams.get('mapFilters') || '').split(',');
  const layerGroupByFilterRef = useRef<{
    [filterType: string]: leaflet.LayerGroup;
  }>({});

  useEffect(() => {
    if (!leafletMap || !leafletMap.getPane('markerPane') || !markers.length) {
      return;
    }

    const newFilters = [...filters];
    Object.entries(layerGroupByFilterRef.current).forEach(
      ([filterType, layerGroup]) => {
        if (!newFilters.includes(filterType)) {
          leafletMap.removeLayer(layerGroup);
          delete layerGroupByFilterRef.current[filterType];
        } else {
          newFilters.splice(newFilters.indexOf(filterType), 1);
        }
      }
    );

    newFilters.map((filter) => {
      const mapFilter = mapFilters.find(
        (mapFilter) => mapFilter.type === filter
      );
      if (!mapFilter) {
        console.warn(`No markers for filter ${filter}`);
        return;
      }
      const markersOfType = markers.filter(
        (marker) => marker.type === mapFilter.type
      );
      const icon = new LeafIcon({ iconUrl: mapFilter.iconUrl });

      const layerGroup = new leaflet.LayerGroup(
        markersOfType.map((markerOfType) => {
          const marker = leaflet
            .marker(markerOfType.position, {
              icon,
            })
            .bindTooltip(mapFilter.title, { direction: 'top' });
          marker.on('click', () => {
            onMarkerClick({ marker: markerOfType, filterItem: mapFilter });
          });
          return marker;
        })
      );
      layerGroup.addTo(leafletMap);
      layerGroupByFilterRef.current[mapFilter.type] = layerGroup;
    });
  }, [filters, leafletMap, markers]);
}

export default useLayerGroups;
