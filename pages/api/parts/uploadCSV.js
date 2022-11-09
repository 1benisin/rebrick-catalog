import { splitArrayIntoGroups, sleep } from '../../../logic/utils';
const fs = require('fs');
const csv = require('csv-parser');

// UPLOADS A CSV FILE WITH HEADERS catId, catName,	partId, partName FROM /public/bricklink_data/parts.csv TO FIRESTORE DB
export default async (req, res) => {
  console.log('parts form CSV to PARTS collection on DB');

  const readCSV = (fileURL) => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(fileURL)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    });
  };

  // read csv file
  const csvParts = await readCSV(
    process.cwd() + '/public/bricklink_data/parts.csv'
  );

  // split csv file for batch upload to DB
  const groupCount = csvParts.length / 400;
  const splitParts = splitArrayIntoGroups(csvParts, groupCount);

  // upload each part in batches to DB
  for (let i = 0; i < splitParts.length; i++) {
    const split = splitParts[i];

    const batch = writeBatch(db);

    split.forEach((p) => batch.set(doc(db, 'parts', p.partId), p));

    await batch.commit();

    console.log(i, 'groups of ', groupCount, 'complete');
    await sleep(1000);
  }

  console.log(
    `${csvParts.length} parts uploaded from CSV file to PARTS collection`
  );

  res
    .status(200)
    .json(
      `${csvParts.length} parts uploaded from CSV file to PARTS collection`
    );
};
