import type { Marker } from '../../contexts/MarkersContext';
import { mapFilters } from '../MapFilter/mapFilters';
import { Link } from '../Router/Router';
import styles from './NearByMarker.module.css';

type NearByMarkerProps = {
  marker: Marker;
};
function NearByMarker({ marker }: NearByMarkerProps): JSX.Element {
  const mapFilter = mapFilters.find((filter) => filter.type === marker.type);

  return (
    <Link href={`/${marker._id}`} preserveSearch className={styles.link}>
      <img className={styles.image} src={mapFilter?.iconUrl} alt="" />
      {mapFilter?.title}
    </Link>
  );
}

export default NearByMarker;
