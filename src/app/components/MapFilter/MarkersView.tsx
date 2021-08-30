import styles from './MarkersView.module.css';
import { mapFiltersCategories } from './mapFilters';
import CategoryTitle from './CategoryTitle';
import { useRouter, useURL } from '../Router/Router';
import { useMemo } from 'react';
import MarkerSection from './MarkerSection';

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
      <div className={styles.list}>
        {mapFiltersCategories.map((mapFilterCategory) => (
          <MarkerSection
            key={mapFilterCategory.value}
            mapFilterCategory={mapFilterCategory}
            filters={filters}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </>
  );
}

export default MarkersView;
