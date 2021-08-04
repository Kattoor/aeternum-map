import { toTimeAgo } from '../../utils/dates';
import styles from './Comment.module.css';
import Markdown from 'markdown-to-jsx';
import Avatar from '../Avatar/Avatar';

type CommentProps = {
  username: string;
  createdAt: Date;
  message: string;
};

function Comment({ username, createdAt, message }: CommentProps): JSX.Element {
  return (
    <article className={styles.container}>
      <Avatar src="https://placekitten.com/64/64" alt="" />
      <h4>{username}</h4>
      <small>{toTimeAgo(createdAt)}</small>
      <main className={styles.message}>
        <Markdown>{message}</Markdown>
      </main>
    </article>
  );
}

export default Comment;
