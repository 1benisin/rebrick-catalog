import ProtectedRoute from '../components/ProtectedRoute';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import {
  collection,
  getDocs,
  query,
  limit,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import PartCard from '../components/PartCard/PartCard';

const getPartCatalog = async () => {
  const q = query(collection(db, 'bricklink_list_parts'), limit(500));
  const docs = await getDocs(q);
  const partCatalog = [];
  docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    partCatalog.push(doc.data());
  });
  return partCatalog;
};

export async function getServerSideProps() {
  return {
    props: {
      initialPartCatalog: await getPartCatalog(),
    },
    // revalidate: 1200,
  };
}

export default function Home({ initialPartCatalog }) {
  const Grid = styled.section`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 2px;
  `;

  const {
    isLoading,
    isError,
    data: partCatalog,
    error,
  } = useQuery('partCatalog', getPartCatalog, {
    initialData: initialPartCatalog,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>Rebrick Catalog</title>
      </Head>

      <Grid>
        {partCatalog.map((part) => (
          <PartCard
            key={part.partNum}
            name={part.name}
            partNum={part.partNum}
            imageUrl={part.thumbnailUrl}
          ></PartCard>
        ))}
      </Grid>
    </ProtectedRoute>
  );
}
