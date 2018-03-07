import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Image, Button, FormControl, FormGroup, Row, Form } from 'react-bootstrap';
import './CustomNavbar.css';

export default class CustomNavbar extends Component {
  constructor(props) {
    super(props);
  }

  userSearch(ev) {
    ev.preventDefault();
    console.log('searching');
    // console.log(FormControl.value);

  }

  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Image src="assets/logo.png" className="logo" responsive />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/Cart" > Carrito </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/" to="/Login" > Mi Mercury </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/" to="/SingUp" > Registro </NavItem>
          </Nav>
          <Navbar.Form pullRight >
            <Form onSubmit={this.userSearch}>
              <FormGroup >
                <FormControl type="text" placeholder="Search" />
              </FormGroup>{' '}
              <Button type="submit">Submit</Button>
            </Form>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
