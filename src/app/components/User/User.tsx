import { useUser } from '../../contexts/UserContext';
import { openLoginDialog } from '../../utils/profile';
import Avatar from '../Avatar/Avatar';
import styles from './User.module.css';

function User(): JSX.Element {
  const user = useUser();

  let content: JSX.Element | null = null;
  if (user) {
    content = <h3>{user.displayName}</h3>;
  } else {
    content = (
      <p>
        For full functionality, please{' '}
        <button onClick={openLoginDialog}>Login</button>
      </p>
    );
  }

  return (
    <section className={styles.header}>
      <Avatar src={user?.avatar || '/icon.png'} alt="" />
      {content}
    </section>
  );
}

export default User;
