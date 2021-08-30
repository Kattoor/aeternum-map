import type { FormEvent } from 'react';
import { useState } from 'react';
import type { Details } from './AddResources';
import styles from './DetailsInput.module.css';

type DetailsInputProps = {
  onChange: ({ name }: Details) => void;
};
function DetailsInput({ onChange }: DetailsInputProps): JSX.Element {
  const [name, setName] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onChange({ name });
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </label>
      </div>
      <button className={styles.submit}>
        {!name ? 'Skip details' : 'Save'}
      </button>
    </form>
  );
}

export default DetailsInput;
