import { createWorker } from 'tesseract.js';
import { takeScreenshot } from './media';

const worker = createWorker();

async function initWorker() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '[].,0123456789 ',
    preserve_interword_spaces: '1',
  });
}

const initializedWorker = initWorker();

function thresholdFilter(pixels: Uint8ClampedArray) {
  const level = 0.5;
  const thresh = Math.floor(level * 255);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let val;
    if (gray >= thresh) {
      val = 255;
    } else {
      val = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
  }
}

async function preprocessorImage(
  url: string,
  width: number,
  height: number
): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image(width, height);
    image.src = url;
    image.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      thresholdFilter(imageData.data);
      context.putImageData(imageData, 0, 0);
      const dataURI = canvas.toDataURL('image/jpeg');
      resolve(dataURI);
    };
  });
}

export async function getPosition(): Promise<[number, number]> {
  const gameInfo = await new Promise<overwolf.games.GetRunningGameInfoResult>(
    (resolve) => overwolf.games.getRunningGameInfo((result) => resolve(result))
  );
  if (!gameInfo || gameInfo.classId !== 21816) {
    throw new Error('Game is not running');
  }
  const url = await takeScreenshot({
    crop: {
      x: gameInfo.width - 400,
      y: 19,
      width: 400,
      height: 16,
    },
  });
  const dataURL = await preprocessorImage(url, 400, 16);
  await initializedWorker;

  const {
    data: { text },
  } = await worker.recognize(dataURL);

  const match = text.match(/\[(\d+[,.]\d{3}|\d+)[, ]+(\d+[,.]\d{3}|\d+)/);
  if (!match) {
    throw new Error('Can not match position');
  }

  const [x, y] = match
    .slice(1)
    .map((a) => a.replace(',', '.'))
    .map(Number);
  if (x < 4531 || x > 14336 || y < 43 || y > 10280) {
    throw new Error('Out of bounds');
  }
  return [y, x];
}
