import { useState } from 'react';
import { classNames } from '../../utils/styles';
import { FilterItem, MapFiltersCategory } from '../MapFilter/mapFilters';
import styles from './AddResources.module.css';
import FishingDetails from './FishingDetails';
import SelectCategory from './SelectCategory';
import SelectPosition from './SelectPosition';

function AddResources(): JSX.Element {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<MapFiltersCategory | null>(null);
  const [filter, setFilter] = useState<FilterItem | null>(null);
  const [position, setPosition] = useState<[number, number, number] | null>(
    null
  );

  return (
    <section className={styles.container}>
      <aside className={styles.stepper}>
        <button
          onClick={() => setStep(0)}
          className={classNames(styles.step, step === 0 && styles.active)}
        >
          <span className={styles.number}>1</span>{' '}
          {category ? category.title : 'Select category'}
        </button>
        <button
          onClick={() => setStep(1)}
          className={classNames(styles.step, step === 1 && styles.active)}
          disabled={!category}
        >
          <span className={styles.number}>2</span>{' '}
          {filter ? filter.title : 'Enter details'}
        </button>
        <button
          onClick={() => setStep(2)}
          className={classNames(styles.step, step === 2 && styles.active)}
          disabled={!filter}
        >
          <span className={styles.number}>3</span>{' '}
          {position ? `[${position.join(', ')}]` : 'Set position'}
        </button>
        <button
          onClick={() => setStep(3)}
          className={classNames(styles.step, step === 3 && styles.active)}
          disabled={!position}
        >
          <span className={styles.number}>4</span> Upload screenshot
        </button>
      </aside>
      {step === 0 && (
        <SelectCategory
          onSelect={(category) => {
            setCategory(category);
            setFilter(null);
            setPosition(null);
            setStep(1);
          }}
        />
      )}
      {step === 1 && category && (
        <>
          {category.value === 'fishing' && (
            <FishingDetails
              category={category}
              onFilterChange={(filter) => {
                setFilter(filter);
                setPosition(null);
                setStep(2);
              }}
            />
          )}
        </>
      )}
      {step === 2 && category && filter && (
        <SelectPosition
          category={category}
          filter={filter}
          onSelect={(position) => {
            setPosition(position);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <div>Screenshot</div>}
    </section>
  );
}

export default AddResources;
