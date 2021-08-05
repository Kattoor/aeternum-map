import styles from './MapFilter.module.css';
import { mapFilters } from './mapFilters';

type MapFilterProps = {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
  onNewFilterClick: () => void;
};
function MapFilter({
  filters,
  onFiltersChange,
  onNewFilterClick,
}: MapFilterProps): JSX.Element {
  function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
    const newFilters = [...filters];
    if (event.target.checked) {
      newFilters.push(event.target.value);
    } else {
      newFilters.splice(newFilters.indexOf(event.target.value), 1);
    }
    onFiltersChange(newFilters);
  }
  return (
    <aside className={styles.container}>
      {mapFilters.map((mapFilter) => (
        <label className={styles.filter} key={mapFilter.value}>
          <input
            type="checkbox"
            value={mapFilter.value}
            onChange={handleToggle}
            checked={filters.includes(mapFilter.value)}
          />
          <img src={mapFilter.imgSrc} alt={mapFilter.title} />
        </label>
      ))}
      <button className={styles.add} onClick={onNewFilterClick}>
        <svg viewBox="0 0 10 10" stroke="currentColor">
          <line x1="0" y1="5" x2="10" y2="5" />
          <line x1="5" y1="0" x2="5" y2="10" />
        </svg>
      </button>
    </aside>
  );
}

export default MapFilter;
