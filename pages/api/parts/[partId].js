const OAuth = require('oauth').OAuth;
import {
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../logic/firebase';
import { fetchBricklinkURL } from '../../../logic/utils';

// const STALE_TIME = 0;
const STALE_TIME = 1000 * 60 * 60 * 24 * 7; // days old

export default async (req, res) => {
  const { partId } = req.query;
  console.log('FETCH - part', partId);

  const docRef = doc(db, 'part_details', partId);
  const docSnap = await getDoc(docRef);
  let partDetails = docSnap.data();

  // is part stale or not have a timestamp
  const isStale =
    !partDetails?.timestamp?.seconds ||
    Date.now() / 1000 - partDetails.timestamp.seconds > STALE_TIME;

  // if part EXISTS on db and is not STALE
  if (partDetails && !isStale) {
    res.status(200).json(partDetails);
    return;
  }

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
  partDetails = {
    ...partDetails,
    image_url: partDetails?.image_url
      ? `https:${partDetails.image_url}`
      : '/fallback.webp',
    thumbnail_url: partDetails?.thumbnail_url
      ? `https:${partDetails.thumbnail_url}`
      : '/fallback.webp',
    timestamp: serverTimestamp(),
  };
  await setDoc(doc(db, 'part_details', partId), partDetails);

  res.status(200).json(partDetails);
};
