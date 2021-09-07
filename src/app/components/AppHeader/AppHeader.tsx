import { useEffect, useState } from 'react';
import { classNames } from '../../utils/styles';
import {
  closeMainWindow,
  dragMoveWindow,
  maximizeCurrentWindow,
  minimizeCurrentWindow,
  restoreCurrentWindow,
} from '../../utils/windows';
import CloseIcon from '../icons/CloseIcon';
import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import RestoreIcon from '../icons/RestoreIcon';
import classes from './AppHeader.module.css';

type AppHeaderProps = {
  className?: string;
};

function AppHeader({ className }: AppHeaderProps): JSX.Element {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    overwolf.windows.getCurrentWindow((result) => {
      setIsMaximized(result.window.stateEx === 'maximized');
    });
    function handleStateChanged(
      event: overwolf.windows.WindowStateChangedEvent
    ) {
      setIsMaximized(event.window_state_ex === 'maximized');
    }
    overwolf.windows.onStateChanged.addListener(handleStateChanged);
    return () => {
      overwolf.windows.onStateChanged.removeListener(handleStateChanged);
    };
  }, []);

  return (
    <header
      className={classNames(classes.header, className)}
      onMouseDown={dragMoveWindow}
      onDoubleClick={isMaximized ? restoreCurrentWindow : maximizeCurrentWindow}
    >
      <img src="/icon.png" alt="" className={classes.logo} />
      <h1 className={classes.title}>New World Companion</h1>
      <div>
        <button className={classes.button} onClick={minimizeCurrentWindow}>
          <MinimizeIcon />
        </button>
        {!isMaximized ? (
          <button
            className={classes.button}
            onClick={() => {
              maximizeCurrentWindow();
              setIsMaximized(true);
            }}
          >
            <MaximizeIcon />
          </button>
        ) : (
          <button
            className={classes.button}
            onClick={() => {
              restoreCurrentWindow();
              setIsMaximized(false);
            }}
          >
            <RestoreIcon />
          </button>
        )}
        <button
          className={`${classes.button} ${classes['button--danger']}`}
          onClick={closeMainWindow}
        >
          <CloseIcon />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
