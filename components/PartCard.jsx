// import Image from 'next/image';
import { Card, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import Image from './ImageWithFallback';
import { sideBarPartNumAtom, sideBarOpenAtom } from '../logic/atoms';

const removeCategoryFromName = (name, category) => {
  const categoryWords = category.split(' ');
  let newName = name;
  categoryWords.forEach((w) => {
    const word = w.replace(',', '');
    const regex = new RegExp(word, 'i');
    newName = newName.replace(regex, '');
  });
  return newName.replace(/[^a-zA-Z0-9\s]/, ''); // get rid of non alpha=numberic at beginning of scentence
};

export default function PartCard({
  name,
  partId,
  category,
  onSelect,
  selected,
}) {
  const [sideBarPartId, setSideBarPartId] = useAtom(sideBarPartNumAtom);
  const [open, setOpen] = useAtom(sideBarOpenAtom);

  const handleAddClick = (e) => {
    setSideBarPartId(partId);
    setOpen(true);
  };

  return (
    <Card bg={selected ? 'primary' : null} onClick={onSelect}>
      {/* <Image
        src={imageUrl}
        alt={partId}
        width={200}
        height={150}
        // layout="intrinsic" // you can use "responsive", "fill" or the default "intrinsic"
        objectFit="contain"
      /> */}

      {/* <PartCategory selected={selected}>{category}</PartCategory> */}
      <PartName selected={selected}>
        {removeCategoryFromName(name, category)}
      </PartName>
      <FlexDiv>
        <PartId selected={selected}>{partId}</PartId>
        <AddButton pill={true} bg="success" onClick={handleAddClick}>
          +
        </AddButton>
      </FlexDiv>

      {/* {selected && <PartId selected>{JSON.stringify(part)}</PartId>} */}
    </Card>
  );
}

const PartCategory = styled(Card.Subtitle)`
  font-size: x-small;
  font-weight: bold;
  color: ${(props) => (props.selected ? 'White' : 'Black')};
  margin: 0px 2px;
`;

const PartName = styled(Card.Title)`
  font-size: x-small;
  color: ${(props) => (props.selected ? 'White' : 'Black')};
  flex: auto;
  margin: 0;
`;

const FlexDiv = styled.div`
  display: flex;
  margin: 5px;
`;

const PartId = styled(Card.Text)`
  font-size: xx-small;
  color: ${(props) => (props.selected ? 'LightGray' : 'Gray')};
  align-self: flex-end;
  flex: auto;
  margin: 0;
`;

const AddButton = styled(Badge)`
  font-size: xx-small;
  cursor: pointer;
  right: 3px;
  bottom: 3px;
  position: absolute;
`;
