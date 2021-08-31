import type { FormEvent } from 'react';
import { useState } from 'react';
import type { FilterItem } from '../MapFilter/mapFilters';
import type { Details } from './AddResources';
import styles from './DetailsInput.module.css';

type DetailsInputProps = {
  filter: FilterItem;
  onChange: (details: Details) => void;
};
function DetailsInput({ filter, onChange }: DetailsInputProps): JSX.Element {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onChange({ name, level, description });
  }
  const isValid =
    (filter.hasName ? name.length > 0 : true) &&
    (filter.hasLevel ? level > 0 : true);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        {filter.hasName && (
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              onChange={(event) => setName(event.target.value)}
              value={name}
              placeholder="Enter name"
              required
            />
          </label>
        )}
        {filter.hasLevel && (
          <label className={styles.label}>
            Level
            <input
              className={styles.input}
              type="number"
              min={1}
              onChange={(event) => setLevel(+event.target.value)}
              value={level}
              required
            />
          </label>
        )}
        <label className={styles.label}>
          Description (optional)
          <textarea
            className={styles.input}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="Feel free to add more details about this marker"
            rows={3}
          />
        </label>
      </div>
      <button className={styles.submit} disabled={!isValid}>
        Save
      </button>
    </form>
  );
}

export default DetailsInput;
