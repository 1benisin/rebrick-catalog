import { sleep } from './utils';

const detecting = false;

export const start = async (stopCallback) => {
  detecting = true;
  for (let i = 0; i < 10; i++) {
    if (!detecting) return;
    console.log('detecting ', i);
    await sleep(200);
  }

  stop();
  stopCallback();
  // do {
  //   console.log('detecting');
  //   await sleep(1000);
  // } while (detecting);
};

export const stop = () => {
  detecting = false;
};
