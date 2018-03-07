import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './About.css';

export default class About extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>About Page</h2>
        </Jumbotron>
      </Grid>
    );
  }
}
