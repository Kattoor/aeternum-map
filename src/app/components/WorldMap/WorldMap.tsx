import styles from './WorldMap.module.css';
import useWorldMap from './useWorldMap';
import useLayerGroups from './useLayerGroups';
import { useEffect, useMemo, useState } from 'react';
import { classNames } from '../../utils/styles';
import { getPosition } from '../../utils/ocr';
import type { Marker } from '../../contexts/MarkersContext';
import { useRouter } from '../Router/Router';
import { useModal } from '../../contexts/ModalContext';
import MarkerDetails from '../MarkerDetails/MarkerDetails';

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
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    if (!leafletMap || !follow) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const position = await getPosition();
        console.log(`Move to ${position}`);
        leafletMap.setView(position);
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [leafletMap, follow]);

  return (
    <div className={styles.map} ref={elementRef}>
      <button
        className={classNames(
          styles.follow,
          follow && styles['follow--active']
        )}
        onClick={() => setFollow(!follow)}
      >
        Follow
      </button>
    </div>
  );
}

export default WorldMap;
