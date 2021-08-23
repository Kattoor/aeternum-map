import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './globals.css';
import App from './App';
import { waitForOverwolf } from './utils/overwolf';
import { RouterProvider } from './components/Router/Router';
import { UserProvider } from './contexts/UserContext';
import { ModalProvider } from './contexts/ModalContext';

waitForOverwolf().then(() => {
  ReactDOM.render(
    <StrictMode>
      <RouterProvider>
        <ModalProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ModalProvider>
      </RouterProvider>
    </StrictMode>,
    document.querySelector('#root')
  );
});
