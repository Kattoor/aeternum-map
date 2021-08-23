import styles from './WorldMap.module.css';
import useWorldMap from './useWorldMap';
import { Marker } from '../../useMarkers';
import useLayerGroups from './useLayerGroups';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/styles';
import { getPosition } from '../../utils/ocr';
import useGeoman from './useGeoman';

type WorldMapProps = {
  markers: Marker[];
};

function WorldMap({ markers }: WorldMapProps): JSX.Element {
  const { leafletMap, elementRef } = useWorldMap();
  useLayerGroups({ markers, leafletMap });
  useGeoman({ leafletMap });
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
