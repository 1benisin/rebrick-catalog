import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const AuthButton = (props) => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleClick = (e) => {
    // e.preventDefault();
    user.uid ? logOut() : router.push('/login/');
  };

  return (
    <>
      <button onClick={handleClick} {...props}>
        {user.uid ? 'Sign Out' : 'Sign In'}
      </button>
      <p>{user.uid ? user.email : null} </p>
    </>
  );
};

export default AuthButton;
