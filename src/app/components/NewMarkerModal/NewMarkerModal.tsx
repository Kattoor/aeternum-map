import { FormEvent, Fragment, useState } from 'react';
import { fetchJSON } from '../../utils/api';
import { mapFiltersCategories } from '../MapFilter/mapFilters';
import Modal from '../Modal/Modal';
import { useURL } from '../Router/Router';
import styles from './NewMarkerModal.module.css';

type NewMarkerModalProps = {
  onClose: () => void;
  onNewMarker: () => void;
};

function NewMarkerModal({
  onClose,
  onNewMarker,
}: NewMarkerModalProps): JSX.Element {
  const url = useURL();
  const [type, setType] = useState('');
  const [x, setX] = useState<number>(+(url.searchParams.get('x') || 0));
  const [y, setY] = useState<number>(+(url.searchParams.get('y') || 0));
  const [z, setZ] = useState<number>(0);

  const typeIsValid = type.length > 0;
  const xIsValid = x && x > 0 && x <= 14336;
  const yIsValid = y && y > 0 && y <= 14336;
  const zIsValid = z && z > 0 && z <= 2000;
  const isValid = typeIsValid && xIsValid && yIsValid && zIsValid;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const position = [x, y, z];
    fetchJSON('/api/markers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, position }),
    }).then(onNewMarker);
  }

  return (
    <Modal onClose={onClose}>
      <header className={styles.header}>
        <h2>Add a marker</h2>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Type
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="" disabled>
              --Please select a type --
            </option>
            {mapFiltersCategories.map((mapFilterCategory) => (
              <Fragment key={mapFilterCategory.value}>
                <option value="" disabled>
                  --{mapFilterCategory.title}--
                </option>
                {mapFilterCategory.filters.map((filter) => (
                  <option key={filter.type} value={filter.type}>
                    {filter.title}
                  </option>
                ))}
              </Fragment>
            ))}
          </select>
        </label>
        <label>
          Position X
          <input
            type="number"
            placeholder="e.g. 9015.152"
            min={0}
            max={14336}
            step={0.001}
            value={x}
            onChange={(event) => setX(+event.target.value)}
            required
          />
        </label>
        <label>
          Position Y
          <input
            type="number"
            placeholder="e.g. 5015.024"
            min={0}
            max={14336}
            step={0.001}
            value={y}
            onChange={(event) => setY(+event.target.value)}
            required
          />
        </label>
        <label>
          Position Z
          <input
            type="number"
            placeholder="e.g. 120.02"
            min={0}
            max={2000}
            step={0.001}
            value={z}
            onChange={(event) => setZ(+event.target.value)}
            required
          />
        </label>
        <input type="submit" value="Send" disabled={!isValid} />
      </form>
    </Modal>
  );
}

export default NewMarkerModal;
