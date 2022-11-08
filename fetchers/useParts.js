import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../logic/firebase';
import useSWR from 'swr';

const fetchParts = async (partId) => {
  console.log('FETCH - parts', partId);
  const url = partId ? `/api/parts/${partId}` : `/api/parts`;
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    console.warn(data);
    throw new Error(data);
  }
  console.log(data);
  return data;

  // const q = query(collection(db, 'bricklink_list_parts'), limit(500));
  // const docs = await getDocs(q);
  // const catalog = [];
  // docs.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   catalog.push(doc.data());
  // });
  // return catalog;
};

export default function useParts(partId = null) {
  const SWRid = partId ? `${partId}_part` : 'parts';

  const { data, error } = useSWR(SWRid, () => fetchParts(partId), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    isLoading: !error && !data,
    error,
  };
}
