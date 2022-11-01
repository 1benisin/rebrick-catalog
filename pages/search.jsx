import ProtectedRoute from '../components/ProtectedRoute';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import PartCard from '../components/PartCard';
import {
  partCatalogAtom,
  getPartCatalog,
  searchFilterAtom,
} from '../logic/atoms';
import SearchInput from '../components/SearchInput';

export async function getStaticProps() {
  // export async function getServerSideProps() {
  return {
    props: {
      initialPartCatalog: await getPartCatalog(),
    },
  };
}

export default function Search({ initialPartCatalog }) {
  useHydrateAtoms([[partCatalogAtom, initialPartCatalog]]);
  const [partCatalog] = useAtom(partCatalogAtom);
  const [searchFilter] = useAtom(searchFilterAtom);

  const [selectedPartNum, setSelectedPartNum] = useState('');

  const filteredPartCatalog = useMemo(() => {
    const lowercaseFilter = searchFilter.toLowerCase();
    return partCatalog.filter((part) => {
      return part.name.toLowerCase().includes(lowercaseFilter);
    });
  }, [partCatalog, searchFilter]);

  return (
    <>
      <Head>
        <title>Rebrick Catalog</title>
      </Head>

      <ProtectedRoute>
        <SearchInput />
        <br />

        <Grid>
          {filteredPartCatalog.map((part) => (
            <PartCard
              part={part}
              onSelect={() => setSelectedPartNum(part.partNum)}
              selected={selectedPartNum == part.partNum ? true : false}
              key={part.partNum}
              name={part.name}
              partNum={part.partNum}
              imageUrl={part.thumbnailUrl}
              category={part.category}
            ></PartCard>
          ))}
        </Grid>
      </ProtectedRoute>
    </>
  );
}

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 2px;
`;
