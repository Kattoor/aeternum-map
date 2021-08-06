import styles from './WorldMap.module.css';
import useWorldMap from './useWorldMap';
import { Marker } from '../../useMarkers';
import useLayerGroups from './useLayerGroups';
import { FilterItem } from '../MapFilter/mapFilters';
import { useEffect, useState } from 'react';
import { classNames } from '../../utils/styles';
import { getPosition } from '../../utils/ocr';

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
