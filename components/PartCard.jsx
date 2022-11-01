import Image from 'next/image';
import { Card, CardText, CardSubtitle, CardTitle } from 'reactstrap';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

const PartCategory = styled(CardTitle)`
  font-size: x-small;
  font-weight: bold;
  color: ${(props) => (props.selected ? 'White' : 'Black')};
  margin: 0px 2px;
`;

const PartName = styled(CardTitle)`
  font-size: x-small;
  color: ${(props) => (props.selected ? 'White' : 'Black')};
  flex: auto;
`;

const PartNumber = styled(CardSubtitle)`
  font-size: xx-small;
  color: ${(props) => (props.selected ? 'LightGray' : 'Gray')};
  text-align: right;
  align-self: flex-end;
`;

const PartCard = ({
  part,
  name,
  partNum,
  imageUrl,
  category,
  onSelect,
  selected,
}) => {
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

  return (
    <Card color={selected ? 'primary' : null} onClick={onSelect}>
      <Image
        src={imageUrl}
        alt={partNum}
        width={200}
        height={150}
        // layout="intrinsic" // you can use "responsive", "fill" or the default "intrinsic"
        objectFit="contain"
      />
      <PartCategory selected={selected}>{category}</PartCategory>
      <PartName selected={selected}>
        {removeCategoryFromName(name, category)}
      </PartName>
      {/* <PartName>{name}</PartName> */}
      <PartNumber selected={selected}>{partNum}</PartNumber>

      {/* {selected && <PartNumber selected>{JSON.stringify(part)}</PartNumber>} */}
    </Card>
  );
};

export default PartCard;
