import { useState } from 'react';
import { useMarkers } from '../../contexts/MarkersContext';
import { useModal } from '../../contexts/ModalContext';
import { useUser } from '../../contexts/UserContext';
import { fetchJSON } from '../../utils/api';
import { classNames } from '../../utils/styles';
import type { FilterItem, MapFiltersCategory } from '../MapFilter/mapFilters';
import styles from './AddResources.module.css';
import FishingDetails from './FishingDetails';
import SelectCategory from './SelectCategory';
import SelectPosition from './SelectPosition';
import StepIcon from './StepIcon';
import UploadScreenshot from './UploadScreenshot';

function AddResources(): JSX.Element {
  const user = useUser();
  const { closeLatestModal } = useModal();
  const { refresh } = useMarkers();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<MapFiltersCategory | null>(null);
  const [filter, setFilter] = useState<FilterItem | null>(null);
  const [position, setPosition] = useState<[number, number, number] | null>(
    null
  );

  async function handleUploadScreenshot(screenshotUrl: string) {
    if (!filter || !position || !user) {
      return;
    }
    const marker = {
      type: filter.type,
      position,
      username: user.username,
      screenshotUrl,
    };
    await fetchJSON('/api/markers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marker),
    });
    refresh();
    closeLatestModal();
  }

  return (
    <section className={styles.container}>
      <aside className={styles.stepper}>
        <button onClick={() => setStep(0)} className={styles.step}>
          <StepIcon step={1} done={Boolean(category)} disabled={false} />{' '}
          <span className={classNames(step === 0 && styles.active)}>
            {category ? category.title : 'Select category'}
          </span>
        </button>
        <button
          onClick={() => setStep(1)}
          className={styles.step}
          disabled={!category}
        >
          <StepIcon step={2} done={Boolean(filter)} disabled={!category} />{' '}
          <span className={classNames(step === 1 && styles.active)}>
            {filter ? filter.title : 'Enter details'}
          </span>
        </button>
        <button
          onClick={() => setStep(2)}
          className={styles.step}
          disabled={!filter}
        >
          <StepIcon step={3} done={Boolean(position)} disabled={!filter} />{' '}
          <span className={classNames(step === 2 && styles.active)}>
            {position ? `[${position.join(', ')}]` : 'Set position'}
          </span>
        </button>
        <button
          onClick={() => setStep(3)}
          className={styles.step}
          disabled={!position}
        >
          <StepIcon step={4} done={false} disabled={!position} />{' '}
          <span className={classNames(step === 3 && styles.active)}>
            Upload screenshot
          </span>
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
          filter={filter}
          onSelect={(position) => {
            setPosition(position);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <UploadScreenshot onUpload={handleUploadScreenshot} />}
    </section>
  );
}

export default AddResources;
