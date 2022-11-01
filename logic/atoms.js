import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from './firebase';
import { atom } from 'jotai';

export const partCatalogAtom = atom([]);

export const getPartCatalog = async () => {
  console.log('FETCH - part catalog');
  const q = query(collection(db, 'bricklink_list_parts'), limit(500));
  const docs = await getDocs(q);
  const catalog = [];
  docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    catalog.push(doc.data());
  });
  return catalog;
};

export const searchFilterAtom = atom('');
