import { classNames } from '../../utils/styles';
import {
  closeMainWindow,
  dragMoveWindow,
  minimizeWindow,
} from '../../utils/windows';
import CloseIcon from '../icons/CloseIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import classes from './AppHeader.module.css';

type AppHeaderProps = {
  className?: string;
};

function AppHeader({ className }: AppHeaderProps): JSX.Element {
  return (
    <header
      className={classNames(classes.header, className)}
      onMouseDown={dragMoveWindow}
    >
      <img src="/icon.png" alt="" className={classes.logo} />
      <h1 className={classes.title}>New World Companion</h1>
      <div>
        <button className={classes.button} onClick={minimizeWindow}>
          <MinimizeIcon />
        </button>
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
