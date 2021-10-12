import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './globals.css';
import { waitForOverwolf } from './utils/overwolf';
import { UserProvider } from './contexts/UserContext';
import { MarkersProvider, useMarkers } from './contexts/MarkersContext';
import { PositionProvider } from './contexts/PositionContext';
import WorldMap from './components/WorldMap/WorldMap';
import styles from './Minimap.module.css';
import { RouterProvider } from './components/Router/Router';
import { dragMoveWindow } from './utils/windows';

function Minimap(): JSX.Element {
  const { markers } = useMarkers();

  return (
    <div className={styles.container} onMouseDown={dragMoveWindow}>
      <WorldMap
        markers={markers}
        hideControls
        alwaysFollowing
        initialZoom={2}
      />
    </div>
  );
}

waitForOverwolf().then(() => {
  ReactDOM.render(
    <StrictMode>
      <RouterProvider readonly>
        <UserProvider>
          <MarkersProvider>
            <PositionProvider>
              <Minimap />
            </PositionProvider>
          </MarkersProvider>
        </UserProvider>
      </RouterProvider>
    </StrictMode>,
    document.querySelector('#root')
  );
});
