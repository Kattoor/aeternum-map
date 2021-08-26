import styles from './WorldMap.module.css';
import useWorldMap from './useWorldMap';
import useLayerGroups from './useLayerGroups';
import { useMemo } from 'react';
import type { Marker } from '../../contexts/MarkersContext';
import { useRouter } from '../Router/Router';
import { useModal } from '../../contexts/ModalContext';
import MarkerDetails from '../MarkerDetails/MarkerDetails';
import usePlayerPosition from './usePlayerPosition';

type WorldMapProps = {
  markers: Marker[];
};

function WorldMap({ markers }: WorldMapProps): JSX.Element {
  const { url } = useRouter();
  const { addModal } = useModal();
  const searchParam = url.searchParams.get('mapFilters');
  const filters = useMemo(
    () => (searchParam?.length ? searchParam.split(',') : []),
    [searchParam]
  );

  const { leafletMap, elementRef } = useWorldMap({ selectMode: false });
  useLayerGroups({
    markers,
    leafletMap,
    filters,
    onMarkerClick: (marker) => {
      addModal({
        children: <MarkerDetails marker={marker} />,
      });
    },
  });
  usePlayerPosition({ leafletMap });

  return <div className={styles.map} ref={elementRef} />;
}

export default WorldMap;
