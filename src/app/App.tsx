import { useEffect } from 'react';
import styles from './App.module.css';
import Ads from './components/Ads/Ads';
import AppHeader from './components/AppHeader/AppHeader';
import MapFilter from './components/MapFilter/MapFilter';
import MarkerDetails from './components/MarkerDetails/MarkerDetails';
import NewMarker from './components/NewMarker/NewMarker';
import { useRouter } from './components/Router/Router';
import WorldMap from './components/WorldMap/WorldMap';
import useMarkers from './useMarkers';

function App(): JSX.Element {
  const router = useRouter();
  const { markers, refresh } = useMarkers();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        router.go('/', true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const targetMarker =
    router.url.pathname !== '/'
      ? markers.find((marker) => marker._id === router.url.pathname.slice(1))
      : undefined;
  console.log(router.url);
  return (
    <div className={styles.container}>
      <AppHeader />
      <MapFilter />
      <WorldMap markers={markers} />
      <aside className={styles.more}>
        {router.url.pathname !== '/' && targetMarker ? (
          <MarkerDetails marker={targetMarker} />
        ) : (
          <NewMarker
            onNewMarker={() => {
              refresh();
            }}
          />
        )}
        <Ads />
      </aside>
    </div>
  );
}

export default App;
