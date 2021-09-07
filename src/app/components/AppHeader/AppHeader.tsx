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
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
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
      <div className={classes.controls}>
        <a
          className={classNames(classes.button, classes['button--github'])}
          href="https://github.com/lmachens/new-world-companion"
          target="_blank"
        >
          <GitHubIcon />
        </a>
        <a
          className={classNames(classes.button, classes['button--discord'])}
          href="https://discord.gg/NTZu8Px"
          target="_blank"
        >
          <DiscordIcon />
        </a>
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
