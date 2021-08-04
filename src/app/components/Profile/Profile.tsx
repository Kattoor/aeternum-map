import Avatar from '../Avatar/Avatar';
import styles from './Profile.module.css';

function Profile(): JSX.Element {
  return (
    <section className={styles.container}>
      <Avatar src="https://placekitten.com/64/64" alt="" />
      <h2>[Coach] Leon</h2>
      <p>4 kyu</p>
    </section>
  );
}

export default Profile;
