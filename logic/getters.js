import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from './firebase';
import useSWR from 'swr';

const fetchPartCatalog = async () => {
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

export const usePartCatalog = () => {
  const { data, error } = useSWR(`partCatalog`, fetchPartCatalog, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    partCatalog: data,
    isLoading: !error && !data,
    error,
  };
};
