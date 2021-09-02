import styles from './MarkersView.module.css';
import { mapFilters, mapFiltersCategories } from './mapFilters';
import { useRouter, useURL } from '../Router/Router';
import { useMemo } from 'react';
import MarkerSection from './MarkerSection';
import Checkbox from './Checkbox';

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
        const index = newFilters.indexOf(filterType);
        if (index !== -1) {
          newFilters.splice(newFilters.indexOf(filterType), 1);
        }
      });
    }
    router.search({
      mapFilters: newFilters.join(','),
    });
  }

  return (
    <>
      <div className={styles.actions}>
        <button
          className={styles.action}
          onClick={() => {
            router.search({
              mapFilters: mapFilters.map((filter) => filter.type).join(','),
            });
          }}
        >
          Show all
        </button>
        <button
          className={styles.action}
          onClick={() => {
            router.search({
              mapFilters: '',
            });
          }}
        >
          Hide all
        </button>
        <Checkbox
          className={styles.action}
          onChange={(checked) => handleToggle(['hidden'], checked)}
          checked={filters.includes('hidden')}
          title="Show Hidden"
        />
      </div>
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
