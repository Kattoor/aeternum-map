import {
  mapFiltersCategories,
  MapFiltersCategory,
} from '../MapFilter/mapFilters';
import styles from './SelectCategory.module.css';

type SelectCategoryType = {
  onSelect: (category: MapFiltersCategory) => void;
};
function SelectCategory({ onSelect }: SelectCategoryType): JSX.Element {
  return (
    <div className={styles.categories}>
      {mapFiltersCategories.map((category) => (
        <button
          key={category.value}
          className={styles.category}
          onClick={() => onSelect(category)}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}

export default SelectCategory;
