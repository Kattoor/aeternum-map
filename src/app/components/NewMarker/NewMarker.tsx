import { FormEvent, Fragment, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { fetchJSON } from '../../utils/api';
import { mapFilters, mapFiltersCategories } from '../MapFilter/mapFilters';
import { useRouter } from '../Router/Router';
import styles from './NewMarker.module.css';

type NewMarkerProps = {
  onNewMarker: () => void;
};

function NewMarker({ onNewMarker }: NewMarkerProps): JSX.Element {
  const router = useRouter();
  const user = useUser();
  const [type, setType] = useState('');
  const [name, setName] = useState('');

  const x = +(router.url.searchParams.get('x') || 0);
  const y = +(router.url.searchParams.get('y') || 0);
  const [z, setZ] = useState<number>(0);

  const typeIsValid = type.length > 0;
  const xIsValid = x && x > 0 && x <= 14336;
  const yIsValid = y && y > 0 && y <= 14336;
  const zIsValid = z >= 0 && z <= 2000;
  const isValid = typeIsValid && xIsValid && yIsValid && zIsValid;

  const filterItem = mapFilters.find((filter) => filter.type === type);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) {
      return;
    }
    const position = [x, y, z];
    fetchJSON('/api/markers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, position, name, username: user.username }),
    }).then(onNewMarker);
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Position X
          <input
            type="number"
            placeholder="e.g. 9015.152"
            min={0}
            max={14336}
            step={0.25}
            value={x}
            onChange={(event) => router.search({ x: event.target.value })}
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
            step={0.25}
            value={y}
            onChange={(event) => router.search({ y: event.target.value })}
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
            step={0.25}
            value={z}
            onChange={(event) => setZ(+event.target.value)}
            required
          />
        </label>
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
        {filterItem?.hasName && (
          <label>
            Name
            <input
              type="text"
              placeholder="e.g. Nora Linch"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        )}
        <input type="submit" value="Add marker" disabled={!isValid || !user} />
      </form>
    </section>
  );
}

export default NewMarker;
