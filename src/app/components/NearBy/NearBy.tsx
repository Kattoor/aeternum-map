import { useMemo } from 'react';
import { useMarkers } from '../../contexts/MarkersContext';
import { usePosition } from '../../contexts/PositionContext';
import styles from './NearBy.module.css';
import NearByMarker from './NearByMarker';

function getDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
): number {
  return Math.sqrt(
    Math.pow(latitude1 - latitude2, 2) + Math.pow(longitude1 - longitude2, 2)
  );
}

function NearBy(): JSX.Element {
  const { position, toggleTracking } = usePosition();
  const { markers } = useMarkers();

  const markersByDistance = useMemo(
    () =>
      position &&
      markers
        .sort(({ position: positionA }, { position: positionB }) => {
          if (!positionA) {
            return 1;
          }
          if (!positionB) {
            return -1;
          }
          const distanceA = getDistance(
            positionA[0],
            positionA[1],
            position[0],
            position[1]
          );
          const distanceB = getDistance(
            positionB[0],
            positionB[1],
            position[0],
            position[1]
          );
          return distanceA - distanceB;
        })
        .slice(0, 20),
    [markers, position]
  );
  return (
    <section className={styles.container}>
      <h3>Near by markers</h3>
      <div className={styles.items}>
        {markersByDistance ? (
          markersByDistance.map((marker) => (
            <NearByMarker key={marker._id} marker={marker} />
          ))
        ) : (
          <>
            <p>Please run game with position log to use this feature.</p>
            <button onClick={toggleTracking}>Test now</button>
          </>
        )}
      </div>
    </section>
  );
}

export default NearBy;
