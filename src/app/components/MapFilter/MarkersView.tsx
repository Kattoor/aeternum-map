import styles from './MarkersView.module.css';
import { mapFiltersCategories } from './mapFilters';
import CategoryTitle from './CategoryTitle';
import Checkbox from './Checkbox';
import { useRouter, useURL } from '../Router/Router';
import { useMemo } from 'react';

function MarkersView(): JSX.Element {
  const router = useRouter();
  const url = useURL();

  const searchParam = url.searchParams.get('mapFilters');
  const filters = useMemo(
    () => (searchParam?.length ? searchParam.split(',') : []),
    [searchParam]
  );
  function handleToggle(filterTypes: string[], checked: boolean) {
    const newFilters = [...filters];
    if (checked) {
      newFilters.push(...filterTypes);
    } else {
      filterTypes.forEach((filterType) => {
        newFilters.splice(newFilters.indexOf(filterType), 1);
      });
    }
    router.search({
      mapFilters: newFilters.join(','),
    });
  }

  return (
    <>
      <CategoryTitle>Markers</CategoryTitle>
      <div className={styles.list}>
        {mapFiltersCategories.map((mapFilterCategory) => (
          <section key={mapFilterCategory.value} className={styles.category}>
            {mapFilterCategory.filters.length > 1 && (
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
            )}
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
      </div>
    </>
  );
}

export default MarkersView;
