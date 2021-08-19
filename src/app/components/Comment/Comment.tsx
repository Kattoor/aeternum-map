import { toTimeAgo } from '../../utils/dates';
import styles from './Comment.module.css';
import Markdown from 'markdown-to-jsx';
import Avatar from '../Avatar/Avatar';

type CommentProps = {
  displayName: string;
  avatar: string;
  createdAt: Date;
  message: string;
};

function Comment({
  displayName,
  avatar,
  createdAt,
  message,
}: CommentProps): JSX.Element {
  return (
    <article className={styles.container}>
      <Avatar src={avatar} alt="" />
      <h4>{displayName}</h4>
      <small>{toTimeAgo(createdAt)}</small>
      <main className={styles.message}>
        <Markdown>{message}</Markdown>
      </main>
    </article>
  );
}

export default Comment;
