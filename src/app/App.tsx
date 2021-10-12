import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import MapFilter from './components/MapFilter/MapFilter';
import ResizeBorder from './components/ResizeBorder/ResizeBorder';
import { useRouter } from './components/Router/Router';
import WorldMap from './components/WorldMap/WorldMap';
import { useMarkers } from './contexts/MarkersContext';

function App(): JSX.Element {
  const router = useRouter();
  const { markers } = useMarkers();

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

  return (
    <div className={styles.container}>
      <AppHeader />
      <MapFilter />
      <WorldMap markers={markers} />
      <ResizeBorder />
    </div>
  );
}

export default App;
