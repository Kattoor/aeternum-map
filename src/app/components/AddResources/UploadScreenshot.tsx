import { useEffect, useRef, useState } from 'react';
import { fetchJSON } from '../../utils/api';
import { takeScreenshot } from '../../utils/media';
import styles from './UploadScreenshot.module.css';

type UploadScreenshotProps = {
  onUpload: (path?: string) => void;
};
function UploadScreenshot({ onUpload }: UploadScreenshotProps): JSX.Element {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !screenshot) {
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };
    image.src = screenshot;
  }, [canvasRef.current, screenshot]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    setScreenshot(URL.createObjectURL(file));
  }

  async function handleUpload() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    if (!screenshot) {
      onUpload();
    } else {
      const formData = new FormData();
      canvas.toBlob(async (blob) => {
        if (!blob) {
          return;
        }
        formData.append('screenshot', blob);

        const result = await fetchJSON<{ filename: string }>(
          '/api/screenshots',
          {
            method: 'POST',
            body: formData,
          }
        );
        onUpload(result.filename);
      });
    }
  }

  async function handleTakeScreenshot() {
    try {
      const screenshotUrl = await takeScreenshot();
      setScreenshot(screenshotUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <div className={styles.actions}>
          <button className={styles.action} onClick={handleTakeScreenshot}>
            Take screenshot
          </button>
          <span>or</span>
          <label className={styles.action}>
            Choose file
            <input
              className={styles.hidden}
              type="file"
              onChange={handleChange}
              accept="image/*"
              name="screenshot"
            />
          </label>
        </div>
        <canvas ref={canvasRef} className={styles.screenshot} />
      </div>
      <button onClick={handleUpload} className={styles.upload}>
        {!screenshot ? 'Skip screenshot' : 'Save'}
      </button>
    </div>
  );
}

export default UploadScreenshot;
