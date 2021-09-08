import { useEffect, useState } from 'react';
import { useIsNewWorldRunning } from '../../utils/games';
import { SHOW_HIDE_APP, useHotkeyBinding } from '../../utils/hotkeys';
import { classNames } from '../../utils/styles';
import {
  closeMainWindow,
  dragMoveWindow,
  maximizeCurrentWindow,
  minimizeCurrentWindow,
  restoreCurrentWindow,
  togglePreferedWindow,
} from '../../utils/windows';
import CloseIcon from '../icons/CloseIcon';
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import MonitorIcon from '../icons/MonitorIcon';
import RestoreIcon from '../icons/RestoreIcon';
import classes from './AppHeader.module.css';

type AppHeaderProps = {
  className?: string;
};

function AppHeader({ className }: AppHeaderProps): JSX.Element {
  const [isMaximized, setIsMaximized] = useState(false);
  const isNewWorldRunning = useIsNewWorldRunning();
  const hotkeyBinding = useHotkeyBinding(SHOW_HIDE_APP);

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
      <h1 className={classes.title}>Aeternum Map</h1>
      <p className={classes.gameInfo}>
        {isNewWorldRunning
          ? `${hotkeyBinding} to show/hide app`
          : 'New World is not running'}
      </p>
      <div className={classes.controls}>
        <a
          className={classNames(classes.button, classes['button--github'])}
          href="https://github.com/lmachens/aeternum-map"
          target="_blank"
          data-tooltip="Open Source on GitHub"
        >
          <GitHubIcon />
        </a>
        <a
          className={classNames(classes.button)}
          href="https://discord.gg/NTZu8Px"
          target="_blank"
          data-tooltip="Join Discord Community"
        >
          <DiscordIcon />
        </a>
        <button
          className={classNames(classes.button)}
          onClick={togglePreferedWindow}
          data-tooltip={'Toggle Desktop/Overlay'}
          disabled={!isNewWorldRunning}
        >
          <MonitorIcon />
        </button>
        <button
          className={classNames(classes.button, classes['button--padded'])}
          onClick={minimizeCurrentWindow}
        >
          <MinimizeIcon />
        </button>
        {!isMaximized ? (
          <button
            className={classNames(classes.button, classes['button--padded'])}
            onClick={() => {
              maximizeCurrentWindow();
              setIsMaximized(true);
            }}
          >
            <MaximizeIcon />
          </button>
        ) : (
          <button
            className={classNames(classes.button, classes['button--padded'])}
            onClick={() => {
              restoreCurrentWindow();
              setIsMaximized(false);
            }}
          >
            <RestoreIcon />
          </button>
        )}
        <button
          className={classNames(
            classes.button,
            classes['button--padded'],
            classes['button--danger']
          )}
          onClick={closeMainWindow}
        >
          <CloseIcon />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
