import { useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { classNames } from '../../utils/styles';
import { useRouter } from '../Router/Router';
import AddIcon from '../icons/AddIcon';
import AreasView from './AreasView';
import styles from './MapFilter.module.css';
import MapIcon from '../icons/MapIcon';
import MarkerIcon from '../icons/MarkerIcon';
import MarkersView from './MarkersView';
import MenuOpenIcon from '../icons/MenuOpenIcon';
import SearchIcon from '../icons/SearchIcon';
import AddResources from '../AddResources/AddResources';
import { usePosition } from '../../contexts/PositionContext';
import Ads from '../Ads/Ads';
import NearBy from '../NearBy/NearBy';
import User from '../User/User';

type View = 'markers' | 'areas' | 'nearBy';

function MapFilter(): JSX.Element {
  const { addModal } = useModal();
  const [isOpen, setIsOpen] = useState(true);
  const { url, search } = useRouter();
  const { following, toggleFollowing } = usePosition();

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
        <User />
        {view === 'markers' && <MarkersView />}
        {view === 'areas' && <AreasView />}
        {view === 'nearBy' && <NearBy />}
        <Ads />
      </div>
      <nav className={styles.nav}>
        <button
          onClick={() =>
            addModal({
              title: 'Add resources',
              children: <AddResources />,
            })
          }
        >
          <AddIcon />
        </button>
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
          className={classNames(view === 'nearBy' && styles.nav__active)}
          onClick={() => handleViewClick('nearBy')}
        >
          <SearchIcon />
        </button>
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuOpenIcon />
        </button>
        <button
          onClick={toggleFollowing}
          className={classNames(following && styles.nav__active)}
        >
          <img src="/player.webp" alt="" />
        </button>
      </nav>
    </aside>
  );
}

export default MapFilter;
