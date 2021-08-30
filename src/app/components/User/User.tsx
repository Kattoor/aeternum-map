import { usePosition } from '../../contexts/PositionContext';
import { useUser } from '../../contexts/UserContext';
import { openLoginDialog } from '../../utils/profile';
import Avatar from '../Avatar/Avatar';
import styles from './User.module.css';

function User(): JSX.Element {
  const user = useUser();

  return (
    <section className={styles.container}>
      <Avatar
        src={user?.avatar || '/icon.png'}
        alt=""
        className={styles.avatar}
      />
      {user ? (
        <span>{user.displayName}</span>
      ) : (
        <button onClick={openLoginDialog} className={styles.login}>
          Login for full functionality
        </button>
      )}
    </section>
  );
}

export default User;
