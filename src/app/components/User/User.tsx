import { useUser } from '../../contexts/UserContext';
import styles from './User.module.css';

function User(): JSX.Element {
  const user = useUser();

  return (
    <section className={styles.container}>
      {user ? (
        <span>Welcome back, {user.username}!</span>
      ) : (
        <p className={styles.login}>Run New World for player detection</p>
      )}
    </section>
  );
}

export default User;
