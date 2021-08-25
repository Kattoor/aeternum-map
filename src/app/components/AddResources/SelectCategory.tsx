import type { MapFiltersCategory } from '../MapFilter/mapFilters';
import { mapFiltersCategories } from '../MapFilter/mapFilters';
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
          <img className={styles.image} src={category.imgSrc} alt="" />
          {category.title}
        </button>
      ))}
    </div>
  );
}

export default SelectCategory;
