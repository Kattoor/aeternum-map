import styles from './WorldMap.module.css';
import useWorldMap from './useWorldMap';
import useLayerGroups from './useLayerGroups';
import { useEffect, useMemo, useState } from 'react';
import { classNames } from '../../utils/styles';
import { getPosition } from '../../utils/ocr';
import { Marker } from '../../contexts/MarkersContext';
import { useRouter } from '../Router/Router';

type WorldMapProps = {
  markers: Marker[];
};

function WorldMap({ markers }: WorldMapProps): JSX.Element {
  const { url, go } = useRouter();
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
      go(`/${marker._id}`, true);
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
