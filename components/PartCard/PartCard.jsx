import Image from 'next/image';
import { Card, CardText } from 'reactstrap';
import styled from 'styled-components';

const PartCard = ({ name, partNum, imageUrl }) => {
  const Grid = styled.section`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 2px;
  `;

  return (
    <Card>
      <Image
        src={imageUrl}
        alt="Picture of the author"
        width={75}
        height={50}
        layout="responsive" // you can use "responsive", "fill" or the default "intrinsic"
        objectFit="contain"
      />
      <p>
        <small>{name}</small>
      </p>
      <CardText>
        {/* <small>{partNum}</small> */}
        <small>{partNum}</small>
      </CardText>
    </Card>
  );
};

export default PartCard;
