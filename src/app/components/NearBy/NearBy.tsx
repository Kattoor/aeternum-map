import { useMemo } from 'react';
import { useMarkers } from '../../contexts/MarkersContext';
import { useRouter } from '../Router/Router';
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
  const { url } = useRouter();
  const { markers } = useMarkers();
  const lat = +(url.searchParams.get('y') || 0);
  const lng = +(url.searchParams.get('x') || 0);
  const userPosition = [lng, lat, 100];

  const markersByDistance = useMemo(
    () =>
      markers
        .sort(({ position: positionA }, { position: positionB }) => {
          const distanceA = getDistance(
            positionA[0],
            positionA[1],
            userPosition[0],
            userPosition[1]
          );
          const distanceB = getDistance(
            positionB[0],
            positionB[1],
            userPosition[0],
            userPosition[1]
          );
          return distanceA - distanceB;
        })
        .slice(0, 20),
    [markers, userPosition]
  );
  return (
    <>
      <h3>Near by</h3>
      <section className={styles.container}>
        {markersByDistance.map((marker) => (
          <NearByMarker key={marker._id} marker={marker} />
        ))}
      </section>
    </>
  );
}

export default NearBy;
