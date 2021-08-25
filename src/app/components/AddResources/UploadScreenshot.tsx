import { useState } from 'react';
import { fetchJSON } from '../../utils/api';
import styles from './UploadScreenshot.module.css';

type UploadScreenshotProps = {
  onUpload: (path: string) => void;
};
function UploadScreenshot({ onUpload }: UploadScreenshotProps): JSX.Element {
  const [screenshot, setScreenshot] = useState<File | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    setScreenshot(file);
  }

  async function handleUpload() {
    if (screenshot) {
      const formData = new FormData();
      formData.append('screenshot', screenshot);

      const result = await fetchJSON<{ filename: string }>('/api/screenshots', {
        method: 'POST',
        body: formData,
      });
      onUpload(result.filename);
    }
  }

  return (
    <div className={styles.container}>
      <p>
        Please make sure that your screenshot shows the resource and position.
      </p>
      <div className={styles.preview}>
        {screenshot && (
          <img
            className={styles.screenshot}
            src={URL.createObjectURL(screenshot)}
            alt="screenshot"
          />
        )}
        <input
          type="file"
          onChange={handleChange}
          accept="image/*"
          name="screenshot"
        />
      </div>
      <button
        disabled={!screenshot}
        onClick={handleUpload}
        className={styles.upload}
      >
        Save
      </button>
    </div>
  );
}

export default UploadScreenshot;
