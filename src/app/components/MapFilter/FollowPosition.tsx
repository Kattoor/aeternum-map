import { useModal } from '../../contexts/ModalContext';
import styles from './FollowPosition.module.css';

function FollowPosition(): JSX.Element {
  const { closeLatestModal } = useModal();

  return (
    <article className={styles.container}>
      <p>
        Please make sure to activate <strong>Show FPS</strong> in New World
        settings for position detection.
      </p>
      <img className={styles.showFps} src="/show-fps.webp" alt="Show FPS" />
      <button className={styles.close} onClick={closeLatestModal}>
        Got it!
      </button>
    </article>
  );
}

export default FollowPosition;
