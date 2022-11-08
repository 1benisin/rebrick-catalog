import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { Spinner } from 'react-bootstrap';
import PartCard from '../components/PartCard';
import { searchFilterAtom } from '../logic/atoms';
import useParts from '../fetchers/useParts';

export default function SearchResults({}) {
  const { data: parts, isLoading, error } = useParts();
  const [searchFilter] = useAtom(searchFilterAtom);

  const [selectedPartId, setSelectedPartId] = useState('');

  const filteredParts = useMemo(() => {
    const lowercaseFilter = searchFilter.toLowerCase();
    return parts?.filter((part) => {
      return part.partName.toLowerCase().includes(lowercaseFilter);
    });
  }, [parts, searchFilter]);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p>error</p>;

  return (
    <Grid>
      {filteredParts.slice(50).map((part) => (
        <PartCard
          onSelect={() => setSelectedPartId(part.partId)}
          selected={selectedPartId == part.partId ? true : false}
          key={part.partId}
          name={part.partName}
          partId={part.partId}
          // imageUrl={part.thumbnailUrl}
          category={part.catName}
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
