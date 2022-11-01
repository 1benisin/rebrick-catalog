import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import AuthButton from '../components/AuthButton';

function NavigationBar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <header>
        <Navbar>
          <NavbarBrand href="/">Rebrick Cataloger</NavbarBrand>
          <Nav pills>
            <NavItem>
              <NavLink href="/search/">Search</NavLink>
            </NavItem>
            {/*  <NavItem>
              <NavLink href="/signup">Signup</NavLink>
            </NavItem>{' '}
            */}
            <AuthButton />
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Navbar>
      </header>
      {children}
    </>
  );
}

export default NavigationBar;
