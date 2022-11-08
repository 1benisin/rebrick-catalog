const OAuth = require('oauth').OAuth;
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../logic/firebase';
import { fetchBricklinkURL } from '../../../logic/utils';

export default async (req, res) => {
  const { partId } = req.query;
  console.log('FETCH - part', partId);

  const docRef = doc(db, 'part_details', partId);
  const docSnap = await getDoc(docRef);
  let partDetails = docSnap.data();

  // if part exists on db
  if (partDetails) {
    res.status(200).json(partDetails);
    return;
  }

  // if part doesn't exist on db
  // fetch from bricklink
  partDetails = await fetchBricklinkURL(
    `https://api.bricklink.com/api/store/v1/items/part/${partId}`
  );
  // if part missing on bricklink as well
  if (!partDetails) {
    res.status(500).json('No part on our database or bricklink');
    return;
  }

  // add part to our db
  await setDoc(doc(db, 'part_details', partId), partDetails);

  res.status(200).json(partDetails);
};
