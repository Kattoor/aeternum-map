import { toTimeAgo } from '../../utils/dates';
import styles from './Comment.module.css';
import Markdown from 'markdown-to-jsx';

type CommentProps = {
  username: string;
  createdAt: Date;
  message: string;
};

function Comment({ username, createdAt, message }: CommentProps): JSX.Element {
  return (
    <article className={styles.container}>
      <p className={styles.name}>{username}</p>
      <small className={styles.createdAt}>{toTimeAgo(createdAt)}</small>
      <p className={styles.message}>
        <Markdown>{message}</Markdown>
      </p>
    </article>
  );
}

export default Comment;
