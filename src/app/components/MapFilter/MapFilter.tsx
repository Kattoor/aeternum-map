import { useState } from 'react';
import { classNames } from '../../utils/styles';
import AddIcon from './AddIcon';
import styles from './MapFilter.module.css';
import { mapFiltersCategories, MapFiltersCategory } from './mapFilters';
import MapIcon from './MapIcon';
import MarkerIcon from './MarkerIcon';
import MarkersView from './MarkersView';
import SearchIcon from './SearchIcon';

type View = 'markers' | 'areas' | 'search';

type MapFilterProps = {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
  onNewFilterClick: () => void;
};
function MapFilter({
  filters,
  onFiltersChange,
  onNewFilterClick,
}: MapFilterProps): JSX.Element {
  const [view, setView] = useState<View>('markers');

  return (
    <aside className={styles.container}>
      {view === 'markers' && (
        <MarkersView filters={filters} onFiltersChange={onFiltersChange} />
      )}
      <nav className={styles.nav}>
        <button
          className={classNames(view === 'markers' && styles.nav__active)}
          onClick={() => setView('markers')}
        >
          <MarkerIcon />
        </button>
        <button
          className={classNames(view === 'areas' && styles.nav__active)}
          onClick={() => setView('areas')}
        >
          <MapIcon />
        </button>
        <button
          className={classNames(view === 'search' && styles.nav__active)}
          onClick={() => setView('search')}
        >
          <SearchIcon />
        </button>
        <button onClick={onNewFilterClick}>
          <AddIcon />
        </button>
      </nav>
    </aside>
  );
}

export default MapFilter;
