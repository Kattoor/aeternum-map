import { openLoginDialog } from '../../utils/profile';
import Avatar from '../Avatar/Avatar';
import styles from './User.module.css';
import useUser from './useUser';

function User(): JSX.Element {
  const { user, isLoading } = useUser();

  let content: JSX.Element | null = null;
  if (!isLoading && user) {
    content = <h3>{user.displayName}</h3>;
  } else if (!isLoading) {
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
