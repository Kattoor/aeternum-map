import { useEffect } from 'react';
import { useState } from 'react';
import styles from './App.module.css';
import Ads from './components/Ads/Ads';
import AppHeader from './components/AppHeader/AppHeader';
import MapFilter from './components/MapFilter/MapFilter';
import { FilterItem } from './components/MapFilter/mapFilters';
import MarkerDetails from './components/MarkerDetails/MarkerDetails';
import NewMarker from './components/NewMarker/NewMarker';
import { RouterProvider } from './components/Router/Router';
import WorldMap from './components/WorldMap/WorldMap';
import useMarkers, { Marker } from './useMarkers';

function App(): JSX.Element {
  const [mapTarget, setMapTarget] = useState<{
    marker: Marker;
    filterItem: FilterItem;
  } | null>(null);

  const { markers, refresh } = useMarkers();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMapTarget(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <RouterProvider>
      <div className={styles.container}>
        <AppHeader />
        <MapFilter />
        <WorldMap markers={markers} onMarkerClick={setMapTarget} />
        <aside className={styles.more}>
          {mapTarget && (
            <MarkerDetails
              marker={mapTarget.marker}
              filterItem={mapTarget.filterItem}
            />
          )}
          {!mapTarget && (
            <NewMarker
              onNewMarker={() => {
                refresh();
              }}
            />
          )}
          <Ads />
        </aside>
      </div>
    </RouterProvider>
  );
}

export default App;
