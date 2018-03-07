import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import * as firebase from 'firebase';
import './SingUp.css';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


export default class Login extends Component {

  submitLogin(event) {

    let email = this.email.value;
    let pw = this.password.value;
    if (email !== '' && pw !== '') {
      const promise = firebase.auth().createUserWithEmailAndPassword(email, pw);
      promise.catch(e => alert(e.message));
    }
  }

  render() {
    return (
      <Grid>
        <Jumbotron>
          <h2>Ingresar</h2>
          <form onSubmit={this.submitLogin}>
            <FieldGroup
              id="email"
              type="email"
              label="Nombre email"
              placeholder="Ingrese nombre de usuario"
              inputRef = {(input) => this.email = input }
            />
            <FieldGroup
              id="password"
              type="password"
              label="Password"
              placeholder="Ingrese password"
              inputRef = {(input) => this.password = input }
            />

            <Button type="button" onClick={this.submitLogin.bind(this)}>Log In</Button>
          </form>
        </Jumbotron>
      </Grid>
    );
  }
}
