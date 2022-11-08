import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Spinner } from 'react-bootstrap';
import PartCard from '../components/PartCard';
import { searchFilterAtom } from '../logic/atoms';
import useParts from '../fetchers/useParts';

export default function SearchResults({}) {
  const { partCatalog, isLoading, error } = useParts();
  const [searchFilter] = useAtom(searchFilterAtom);

  const [selectedPartNum, setSelectedPartNum] = useState('');

  const filteredPartCatalog = useMemo(() => {
    const lowercaseFilter = searchFilter.toLowerCase();
    return partCatalog?.filter((part) => {
      return part.name.toLowerCase().includes(lowercaseFilter);
    });
  }, [partCatalog, searchFilter]);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p>error</p>;

  return (
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
  );
}

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 2px;
  margin-top: 10px;
`;
