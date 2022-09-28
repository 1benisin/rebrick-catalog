import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';

import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const router = useRouter();
  //Optional error handling
  const [error, setError] = useState(null);

  const { signUp } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    if (passwordOne === passwordTwo)
      signUp(email, passwordOne)
        .then((authUser) => {
          console.log('Success. The user is created in firebase');
          router.push('/');
        })
        .catch((error) => {
          setError(error.message);
        });
    else setError('Password do not match');
    event.preventDefault();
  };

  return (
    <Container className="text-center" style={{ padding: '40px 0px' }}>
      <Row>
        <h2>Signup</h2>
      </Row>
      <Row>
        <Col>
          <Form
            style={{ maxWidth: '400px', margin: 'auto' }}
            onSubmit={onSubmit}
          >
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="signUpEmail" sm={4}>
                Email
              </Label>
              <Col sm={8}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword" sm={4}>
                Password
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpPassword2" sm={4}>
                Confirm Password
              </Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Password"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Button>Sign Up</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
