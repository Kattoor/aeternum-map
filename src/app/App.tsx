import { useEffect } from 'react';
import { useState } from 'react';
import styles from './App.module.css';
import Ads from './components/Ads/Ads';
import AppHeader from './components/AppHeader/AppHeader';
import MapFilter, { FilterItem } from './components/MapFilter/MapFilter';
import MarkerModal from './components/MarkerModal/MarkerModal';
import NewMarkerModal from './components/NewMarkerModal/NewMarkerModal';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import WorldMap from './components/WorldMap/WorldMap';
import useMarkers, { Marker } from './useMarkers';

function App(): JSX.Element {
  const [mapFilters, setMapFilters] = useState<string[]>(['fishing']);
  const [mapTarget, setMapTarget] = useState<{
    marker: Marker;
    filterItem: FilterItem;
  } | null>(null);
  const [openNewMarkerModal, setOpenNewMarkerModal] = useState(false);

  const { markers, refresh } = useMarkers();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMapTarget(null);
        setOpenNewMarkerModal(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <AppHeader />
      <MapFilter
        filters={mapFilters}
        onFiltersChange={setMapFilters}
        onNewFilterClick={() => setOpenNewMarkerModal(true)}
      />
      <WorldMap
        markers={markers}
        filters={mapFilters}
        onMarkerClick={setMapTarget}
      />
      <aside className={styles.more}>
        <Profile />
        <News />
        <Ads />
      </aside>
      {mapTarget && (
        <MarkerModal
          marker={mapTarget.marker}
          filterItem={mapTarget.filterItem}
          onClose={() => setMapTarget(null)}
        />
      )}
      {openNewMarkerModal && (
        <NewMarkerModal
          onClose={() => setOpenNewMarkerModal(false)}
          onNewMarker={() => {
            setOpenNewMarkerModal(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}

export default App;
