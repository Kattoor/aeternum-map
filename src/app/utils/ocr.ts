import { createWorker } from 'tesseract.js';
import { takeScreenshot } from './media';

const worker = createWorker();

async function initWorker() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '[],0123456789 ',
    preserve_interword_spaces: '1',
  });
}

const initializedWorker = initWorker();

// let index = 0;
// const screenshots = [
//   'overwolf://media/screenshots/New%20World%20Companion/4.jpg',
//   'overwolf://media/screenshots/New%20World%20Companion/1.jpg',
//   'overwolf://media/screenshots/New%20World%20Companion/2.jpg',
//   'overwolf://media/screenshots/New%20World%20Companion/3.jpg',
// ];

export async function getPosition(): Promise<[number, number]> {
  const gameInfo = await new Promise<overwolf.games.GetRunningGameInfoResult>(
    (resolve) => overwolf.games.getRunningGameInfo((result) => resolve(result))
  );
  if (!gameInfo || gameInfo.classId !== 21816) {
    throw new Error('Game is not running');
  }
  gameInfo.width;

  const url = await takeScreenshot({
    crop: {
      x: gameInfo.width - 400,
      y: 0,
      width: 400,
      height: 50,
    },
  });

  await initializedWorker;

  const {
    data: { text },
  } = await worker.recognize(url);
  const match = text.match(/\[(\d+[,.]\d{3}|\d+)[, ]+(\d+[,.]\d{3}|\d+)/);
  if (!match) {
    throw new Error('Can not match position');
  }
  let [x, y] = match
    .slice(1)
    .map((a) => a.replace(',', '.'))
    .map(Number);
  if (x > 14336) {
    x /= 1000;
  }
  if (y > 14336) {
    y /= 1000;
  }
  return [y, x];
}
