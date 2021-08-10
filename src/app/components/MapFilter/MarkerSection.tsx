import { useState } from 'react';
import Checkbox from './Checkbox';
import { MapFiltersCategory } from './mapFilters';
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
  const [open, setOpen] = useState(mapFilterCategory.filters.length <= 1);
  return (
    <section key={mapFilterCategory.value} className={styles.container}>
      {mapFilterCategory.filters.length > 1 && (
        <div className={styles.category}>
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
            imgSrc={mapFilterCategory.imgSrc}
            title={mapFilterCategory.title}
          />
          <svg
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
            ) : (
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            )}
          </svg>
        </div>
      )}
      {open &&
        mapFilterCategory.filters.map((filter) => (
          <Checkbox
            key={filter.type}
            onChange={(checked) => onToggle([filter.type], checked)}
            checked={filters.includes(filter.type)}
            imgSrc={filter.iconUrl}
            title={filter.title}
          />
        ))}
    </section>
  );
}

export default MarkerSection;
