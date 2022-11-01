import ProtectedRoute from '../components/ProtectedRoute';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { useMemo, useState } from 'react';
import { Spinner, Input, InputGroup, Button } from 'reactstrap';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import {
  collection,
  getDocs,
  query,
  limit,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import { db } from '../logic/firebase';
import PartCard from '../components/PartCard';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 2px;
`;

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

const partCatalogAtom = atom([]);

export async function getServerSideProps() {
  return {
    props: {
      initialPartCatalog: await getPartCatalog(),
    },
  };
}

export default function Home({ initialPartCatalog }) {
  useHydrateAtoms([[partCatalogAtom, initialPartCatalog]]);
  const [partCatalog] = useAtom(partCatalogAtom);
  // const {
  //   isLoading,
  //   isError,
  //   data: partCatalog,
  //   error,
  // } = useQuery('partCatalog', getPartCatalog, {
  //   initialData: initialPartCatalog,
  // });

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedPartNum, setSelectedPartNum] = useState('');

  const filteredPartCatalog = useMemo(() => {
    const lowercaseFilter = searchFilter.toLowerCase();
    return partCatalog.filter((part) => {
      return part.name.toLowerCase().includes(lowercaseFilter);
    });
  }, [partCatalog, searchFilter]);

  const onSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      setSearchFilter(e.target.value);
    }
  };

  // _ _ _ COMPONENT UI _ _ _ _ _ _ _ _ _ _ _ _

  // if (isLoading) {
  //   return <Spinner>Loading...</Spinner>;
  // }
  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  return (
    <>
      <Head>
        <title>Rebrick Catalog</title>
      </Head>
      <h1>Main Page</h1>
    </>
  );
}
