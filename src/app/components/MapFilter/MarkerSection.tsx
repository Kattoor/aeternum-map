import Checkbox from './Checkbox';
import type { MapFiltersCategory } from './mapFilters';
import styles from './MarkerSection.module.css';

type MarkerSectionProps = {
  mapFilterCategory: MapFiltersCategory;
  filters: string[];
  onToggle: (filterTypes: string[], checked: boolean) => void;
};

function MarkerSection({
  mapFilterCategory,
  filters,
  onToggle,
}: MarkerSectionProps): JSX.Element {
  return (
    <section key={mapFilterCategory.value} className={styles.container}>
      <Checkbox
        onChange={(checked) =>
          onToggle(
            mapFilterCategory.filters.map((filter) => filter.type),
            checked
          )
        }
        checked={filters.some((filter) =>
          mapFilterCategory.filters.some(
            (categoryFilter) => categoryFilter.type === filter
          )
        )}
        title={mapFilterCategory.title}
        className={styles.category}
      />
      <div className={styles.items}>
        {mapFilterCategory.filters.map((filter) => (
          <Checkbox
            key={filter.type}
            onChange={(checked) => onToggle([filter.type], checked)}
            checked={filters.includes(filter.type)}
            imgSrc={filter.iconUrl}
            title={filter.title}
          />
        ))}
      </div>
    </section>
  );
}

export default MarkerSection;
