import { FilterItem, MapFiltersCategory } from '../MapFilter/mapFilters';
import styles from './FishingDetails.module.css';

type FishingDetailsProps = {
  category: MapFiltersCategory;
  onFilterChange: (filter: FilterItem) => void;
};

function FishingDetails({
  category,
  onFilterChange,
}: FishingDetailsProps): JSX.Element {
  return (
    <div className={styles.container}>
      {category.filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter)}
          className={styles.filter}
        >
          <img className={styles.image} src={filter.iconUrl} alt="" />
          {filter.title}
        </button>
      ))}
    </div>
  );
}

export default FishingDetails;
