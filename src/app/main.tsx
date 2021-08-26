import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './globals.css';
import App from './App';
import { waitForOverwolf } from './utils/overwolf';
import { RouterProvider } from './components/Router/Router';
import { UserProvider } from './contexts/UserContext';
import { ModalProvider } from './contexts/ModalContext';
import { MarkersProvider } from './contexts/MarkersContext';
import { PositionProvider } from './contexts/PositionContext';

waitForOverwolf().then(() => {
  ReactDOM.render(
    <StrictMode>
      <RouterProvider>
        <UserProvider>
          <MarkersProvider>
            <ModalProvider>
              <PositionProvider>
                <App />
              </PositionProvider>
            </ModalProvider>
          </MarkersProvider>
        </UserProvider>
      </RouterProvider>
    </StrictMode>,
    document.querySelector('#root')
  );
});
