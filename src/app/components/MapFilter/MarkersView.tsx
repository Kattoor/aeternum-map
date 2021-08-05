import styles from './MarkersView.module.css';
import { mapFiltersCategories } from './mapFilters';
import CategoryTitle from './CategoryTitle';
import Checkbox from './Checkbox';

type MarkersViewProps = {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
};

function MarkersView({
  filters,
  onFiltersChange,
}: MarkersViewProps): JSX.Element {
  function handleToggle(filterTypes: string[], checked: boolean) {
    const newFilters = [...filters];
    if (checked) {
      newFilters.push(...filterTypes);
    } else {
      filterTypes.forEach((filterType) => {
        newFilters.splice(newFilters.indexOf(filterType), 1);
      });
    }
    onFiltersChange(newFilters);
  }

  return (
    <section>
      <CategoryTitle>Markers</CategoryTitle>
      {mapFiltersCategories.map((mapFilterCategory) => (
        <section key={mapFilterCategory.value} className={styles.category}>
          <Checkbox
            onChange={(checked) =>
              handleToggle(
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
          {mapFilterCategory.filters.map((filter) => (
            <Checkbox
              key={filter.type}
              onChange={(checked) => handleToggle([filter.type], checked)}
              checked={filters.includes(filter.type)}
              imgSrc={filter.iconUrl}
              title={filter.title}
            />
          ))}
        </section>
      ))}
    </section>
  );
}

export default MarkersView;
