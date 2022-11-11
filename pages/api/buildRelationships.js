// import { splitArrayIntoGroups, sleep } from '../../logic/utils';
const fs = require('fs');
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../logic/firebase';

export default async (req, res) => {
  // // get all relationship files
  // const dir = process.cwd() + '/public/scrapedData/';
  // const listFiles = await fs.readdirSync(dir);
  // console.log(listFiles);

  // const relationObj = {}
  // for (const fileName of object) {
  //   // READ JSON FILE
  //   const data = fs.readFileSync(
  //     dir + fileName
  //   );
  //   const obj = JSON.parse(data);
  // }

  // get all parts
  const parts = [];
  // const docs = await getDocs(collection(db, 'parts'));
  const docs = await getDocs(query(collection(db, 'parts'), limit(100)));
  docs.forEach((doc) => {
    parts.push(doc.data());
  });

  // create word arrays
  const wordArray = parts.map(() => {});

  //   // split csv file for batch upload to DB
  //   const groupCount = csvParts.length / 400;
  //   const splitParts = splitArrayIntoGroups(csvParts, groupCount);

  //   // upload each part in batches to DB
  //   for (let i = 0; i < splitParts.length; i++) {
  //     const split = splitParts[i];

  //     const batch = writeBatch(db);

  //     split.forEach((p) => batch.set(doc(db, 'parts', p.partId), p));

  //     await batch.commit();

  //     console.log(i, 'groups of ', groupCount, 'complete');
  //     await sleep(1000);
  //   }

  //   console.log(
  //     `${csvParts.length} parts uploaded from CSV file to PARTS collection`
  //   );

  console.log('done');
  res.status(200).json(parts);
};
