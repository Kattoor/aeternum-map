import { useState, FormEvent } from 'react';
import styles from './AddComment.module.css';

type AddCommentProps = {
  markerId: string;
  onAdd: () => void;
};

function AddComment({ markerId, onAdd }: AddCommentProps): JSX.Element {
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetch(`/api/markers/${markerId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: '[Coach] Leon',
        message: message,
      }),
    })
      .then((response) => response.json())
      .then(() => onAdd());

    console.log(markerId, message);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Add a comment"
        rows={3}
      />
      <input type="submit" value="Send" />
      <small>
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
