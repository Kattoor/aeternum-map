import { createWorker } from 'tesseract.js';

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

export function getPosition(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    overwolf.media.takeScreenshot(async (result) => {
      if (!result.success || !result.url) {
        reject(result.error);
        return;
      }
      const { url } = result;
      await initializedWorker;

      const {
        data: { text },
      } = await worker.recognize(url, {
        rectangle: { left: 1600, top: 17, width: 300, height: 30 },
      });
      console.log(url, text);
      const match = text.match(/\[(\d+[,.]\d{3}|\d+)[, ]+(\d+[,.]\d{3}|\d+)/);
      if (!match) {
        reject('Can not match position');
        return;
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
      resolve([x, y]);
    });
  });
}
