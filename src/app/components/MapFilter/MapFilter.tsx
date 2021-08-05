import { useState } from 'react';
import { classNames } from '../../utils/styles';
import AddIcon from './AddIcon';
import styles from './MapFilter.module.css';
import MapIcon from './MapIcon';
import MarkerIcon from './MarkerIcon';
import MarkersView from './MarkersView';
import MenuOpenIcon from './MenuOpenIcon';
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
  const [isOpen, setIsOpen] = useState(false);

  function handleViewClick(view: View) {
    setView(view);
    setIsOpen(true);
  }

  return (
    <aside className={classNames(styles.container, isOpen && styles.open)}>
      <div className={styles.content}>
        {view === 'markers' && (
          <MarkersView filters={filters} onFiltersChange={onFiltersChange} />
        )}
      </div>
      <nav className={styles.nav}>
        <button
          className={classNames(view === 'markers' && styles.nav__active)}
          onClick={() => handleViewClick('markers')}
        >
          <MarkerIcon />
        </button>
        <button
          className={classNames(view === 'areas' && styles.nav__active)}
          onClick={() => handleViewClick('areas')}
        >
          <MapIcon />
        </button>
        <button
          className={classNames(view === 'search' && styles.nav__active)}
          onClick={() => handleViewClick('search')}
        >
          <SearchIcon />
        </button>
        <button onClick={onNewFilterClick}>
          <AddIcon />
        </button>
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuOpenIcon />
        </button>
      </nav>
    </aside>
  );
}

export default MapFilter;
