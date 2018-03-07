import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';

import Home from './components/Home';
import About from './components/About';
import SingUp from './components/SingUp';
import Navbar from './components/CustomNavbar';
import SideNav from './components/SideNav';
import Cart from './components/Cart';
import Login from './components/Login';

 // Initialize Firebase
const config = {
  apiKey: "AIzaSyBa7yOADK_7PR-ueajFEPjKf9sIPkMPWqw",
  authDomain: "mercury-50142.firebaseapp.com",
  databaseURL: "https://mercury-50142.firebaseio.com",
  projectId: "mercury-50142",
  storageBucket: "mercury-50142.appspot.com",
  messagingSenderId: "1013542528705"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Grid fluid>
          <Row>
            <Col className="sidebar" sm={3} md={3}>
              < SideNav />
            </Col>
            <Col sm={9} md={9}>
              <Route exact path="/" component={Home} />
              <Route path="/Login" component={Login} />
              <Route path="/SingUp" component={SingUp} />
              <Route path="/Cart" component={Cart} />
            </Col>
          </Row>
          </Grid>
        </div>

      </Router>
    );
  }
}

export default App;
