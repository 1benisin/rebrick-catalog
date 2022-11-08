import { Nav, Navbar, NavItem, NavLink } from 'react-bootstrap';
import AuthButton from '../components/AuthButton';

function NavigationBar({ children }) {
  return (
    <>
      <header>
        <Navbar>
          <Navbar.Brand href="/">Rebrick Cataloger</Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/search/">Search</Nav.Link>
            </Nav.Item>
            <AuthButton />
          </Nav>
        </Navbar>
      </header>
      {children}
    </>
  );
}

export default NavigationBar;
