import { useState } from 'react';
import { classNames } from '../../utils/styles';
import { useRouter } from '../Router/Router';
import AreasView from './AreasView';
import styles from './MapFilter.module.css';
import MapIcon from './MapIcon';
import MarkerIcon from './MarkerIcon';
import MarkersView from './MarkersView';
import MenuOpenIcon from './MenuOpenIcon';
import SearchIcon from './SearchIcon';

type View = 'markers' | 'areas' | 'search';

function MapFilter(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const { url, search } = useRouter();

  function handleViewClick(view: View) {
    setIsOpen(true);
    search({
      filterCategory: view,
    });
  }
  const view = url.searchParams.get('filterCategory') || 'markers';

  return (
    <aside className={classNames(styles.container, isOpen && styles.open)}>
      <div className={styles.content}>
        {view === 'markers' && <MarkersView />}
        {view === 'areas' && <AreasView />}
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
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuOpenIcon />
        </button>
      </nav>
    </aside>
  );
}

export default MapFilter;
