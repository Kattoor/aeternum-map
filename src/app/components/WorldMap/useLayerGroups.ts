import { useEffect, useMemo, useRef } from 'react';
import leaflet from 'leaflet';
import { Marker } from '../../useMarkers';
import { mapFilters } from '../MapFilter/mapFilters';
import { useRouter } from '../Router/Router';

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
}: {
  leafletMap: leaflet.Map | null;
  markers: Marker[];
}): void {
  const { url, go } = useRouter();

  const searchParam = url.searchParams.get('mapFilters');
  const filters = useMemo(
    () => (searchParam?.length ? searchParam.split(',') : []),
    [searchParam]
  );
  const layerGroupByFilterRef = useRef<{
    [filterType: string]: leaflet.LayerGroup;
  }>({});

  useEffect(() => {
    if (!leafletMap || !leafletMap.getPane('markerPane') || !markers.length) {
      return;
    }

    Object.entries(layerGroupByFilterRef.current).forEach(
      ([filterType, layerGroup]) => {
        if (!filters.includes(filterType)) {
          leafletMap.removeLayer(layerGroup);
          delete layerGroupByFilterRef.current[filterType];
        }
      }
    );

    filters.forEach((filter) => {
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

      const existingLayerGroup = layerGroupByFilterRef.current[mapFilter.type];
      if (existingLayerGroup) {
        if (existingLayerGroup.getLayers().length === markersOfType.length) {
          return;
        }
        leafletMap.removeLayer(existingLayerGroup);
      }
      const layerGroup = new leaflet.LayerGroup(
        markersOfType.map((markerOfType) => {
          const marker = leaflet
            .marker([markerOfType.position[1], markerOfType.position[0]], {
              icon,
            })
            .bindTooltip(mapFilter.title, { direction: 'top' });
          marker.on('click', () => {
            go(`/${markerOfType._id}`, true);
          });
          return marker;
        })
      );
      layerGroup.addTo(leafletMap);
      layerGroupByFilterRef.current[mapFilter.type] = layerGroup;
    });
  }, [filters, typeof leafletMap, markers]);
}

export default useLayerGroups;
