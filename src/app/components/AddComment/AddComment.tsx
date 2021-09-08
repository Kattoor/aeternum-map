import type { FormEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { fetchJSON } from '../../utils/api';
import styles from './AddComment.module.css';

type AddCommentProps = {
  markerId: string;
  onAdd: () => void;
};

function AddComment({ markerId, onAdd }: AddCommentProps): JSX.Element {
  const user = useUser();
  const [message, setMessage] = useState('');

  async function handleSubmit(event?: FormEvent) {
    if (event) {
      event.preventDefault();
    }
    if (!user) {
      return;
    }

    await fetchJSON(`/api/markers/${markerId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        message: message,
      }),
    });
    onAdd();
    setMessage('');
  }

  function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={
          !user ? 'You need to login to add a comment' : 'Add a comment'
        }
        rows={1}
      />
      <input
        type="submit"
        value="Send"
        disabled={message.trim().length === 0 || !user}
      />
      <small className={styles.hint}>
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          target="_blank"
          rel="noreferrer"
        >
          Markdown
        </a>{' '}
        is supported
      </small>
    </form>
  );
}

export default AddComment;
