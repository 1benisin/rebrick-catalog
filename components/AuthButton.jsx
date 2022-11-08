import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';

export default function AuthButton(props) {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleClick = (e) => {
    // e.preventDefault();
    user.uid ? logOut() : router.push('/login/');
  };

  return (
    <>
      <Button onClick={handleClick} size="sm" {...props}>
        {user.uid ? 'Sign Out' : 'Sign In'}
      </Button>
      <Username>{user.uid ? user.email : null} </Username>
    </>
  );
}

const Username = styled.p`
  padding: 0px 10px;
  font-size: small;
  color: grey;
`;
