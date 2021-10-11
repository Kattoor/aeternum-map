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

function rgbToHsl(r: number, g: number, b: number) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
}

function calcDistance(v1: number[], v2: number[]) {
  let i,
    d = 0;

  for (i = 0; i < v1.length; i++) {
    d += (v1[i] - v2[i]) * (v1[i] - v2[i]);
  }
  return Math.sqrt(d);
}
const baseColor = [62, 40, 80];

function thresholdFilter(pixels: Uint8ClampedArray) {
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const hsl = rgbToHsl(r, g, b);
    const distance = calcDistance(baseColor, hsl);
    let val;
    if (distance < 30) {
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
  const highResOffsetX = gameInfo.width > 3800 ? 245 : 0;
  const url = await takeScreenshot({
    crop: {
      x: gameInfo.width - 280 - highResOffsetX,
      y: 20,
      width: 275,
      height: 14,
    },
    rescale: {
      width: 550,
      height: 32,
    },
  });

  const dataURL = await preprocessorImage(url, 550, 32);
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
