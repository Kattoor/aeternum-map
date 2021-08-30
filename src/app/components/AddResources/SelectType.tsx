import type { FilterItem } from '../MapFilter/mapFilters';
import { mapFiltersCategories } from '../MapFilter/mapFilters';
import styles from './SelectType.module.css';

type SelectTypeType = {
  onSelect: (filter: FilterItem) => void;
};
function SelectType({ onSelect }: SelectTypeType): JSX.Element {
  return (
    <div className={styles.container}>
      {mapFiltersCategories.map((category) => (
        <div key={category.value}>
          <h4 className={styles.title}>{category.title}</h4>
          <div className={styles.items}>
            {category.filters.map((filter) => (
              <button
                key={filter.type}
                onClick={() => onSelect(filter)}
                className={styles.filter}
              >
                <img src={filter.iconUrl} alt="" />
                {filter.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectType;
