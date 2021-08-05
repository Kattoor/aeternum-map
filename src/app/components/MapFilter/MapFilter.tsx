import styles from './MapFilter.module.css';
import { mapFiltersCategories, MapFiltersCategory } from './mapFilters';

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
  function handleToggle(
    mapFilterCategory: MapFiltersCategory,
    checked: boolean
  ) {
    const newFilters = [...filters];
    if (checked) {
      newFilters.push(
        ...mapFilterCategory.filters.map((filter) => filter.type)
      );
    } else {
      mapFilterCategory.filters.forEach((filter) => {
        newFilters.splice(newFilters.indexOf(filter.type), 1);
      });
    }
    onFiltersChange(newFilters);
  }
  return (
    <aside className={styles.container}>
      {mapFiltersCategories.map((mapFilterCategory) => (
        <label className={styles.filter} key={mapFilterCategory.value}>
          <input
            type="checkbox"
            value={mapFilterCategory.value}
            onChange={(event) =>
              handleToggle(mapFilterCategory, event.target.checked)
            }
            checked={filters.some((filter) =>
              mapFilterCategory.filters.some(
                (categoryFilter) => categoryFilter.type === filter
              )
            )}
          />
          <img src={mapFilterCategory.imgSrc} alt={mapFilterCategory.title} />
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
