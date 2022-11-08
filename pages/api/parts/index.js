const OAuth = require('oauth').OAuth;
import { readCSV, splitArrayIntoParts, sleep } from '../../../logic/utils';

let parts = null;

export default async (req, res) => {
  console.log('FETCH - parts');

  // load parts from csv if not loaded
  if (!parts) {
    parts = await readCSV(process.cwd() + '/public/bricklink_data/parts.csv');
  }

  res.status(200).json(parts);

  // const csvParts = await readCSV(
  //   process.cwd() + '/public/bricklink_data/parts.csv'
  // );

  // const splitParts = splitArrayIntoParts(csvParts, csvParts.length / 500);

  // for (let i = 85; i < splitParts.length; i++) {
  //   const split = splitParts[i];
  //   console.log('split', i, 'of 150');

  //   const batch = writeBatch(db);

  //   split.forEach((p) => {
  //     const dataRef = doc(db, 'parts', p.partId);
  //     batch.set(dataRef, p);
  //   });

  //   await batch.commit();
  //   await sleep(1000);
  // }

  // console.log(csvParts[100]);
  // res.status(200).json(csvParts[100]);
};
