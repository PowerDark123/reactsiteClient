import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

export const MyNavbar=({loggedInUser,setLoggedInUser})=> {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="sm" dark color="dark" fixed='top'>
        <NavbarBrand href="/">🚗</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
            <NavLink to="/" className="nav-link" aria-current="page" href="#">Home</NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/about" className="nav-link" href="#">About</NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/contact" className="nav-link" href="#">Contact</NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/products" className="nav-link " href="#" >Products</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
         {loggedInUser ? 
         (
          <Nav navbar>
            <NavItem className="btn nav-link d-flex flex-column align-items-center">
                  <img style={{width:"30px"}} src="gamer.png" alt="avatar" />
                  {loggedInUser}
                
            </NavItem>
            <NavItem className='d-flex align-items-center'>
                <span className='btn btn-danger text-white' onClick={()=>setLoggedInUser('')}>Logout</span>
            </NavItem>
          </Nav>)
         :
         (
          <Nav navbar>
            <NavItem>
                <NavLink to="login" className="nav-link " href="#" >Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="register" className="nav-link " href="#" >Register</NavLink>
            </NavItem>
          </Nav>)
        }
        </Collapse>
      </Navbar>
    </div>
  );
}
