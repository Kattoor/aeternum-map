import styles from './WorldMap.module.css';
import useWorldMap from './useWorldMap';
import { Marker } from '../../useMarkers';
import useLayerGroups from './useLayerGroups';
import { FilterItem } from '../MapFilter/mapFilters';

type WorldMapProps = {
  filters: string[];
  markers: Marker[];
  onMarkerClick: (props: { marker: Marker; filterItem: FilterItem }) => void;
};

function WorldMap({
  filters,
  markers,
  onMarkerClick,
}: WorldMapProps): JSX.Element {
  const { leafletMap, elementRef } = useWorldMap();
  useLayerGroups({ filters, markers, leafletMap, onMarkerClick });

  return <div className={styles.map} ref={elementRef} />;
}

export default WorldMap;
