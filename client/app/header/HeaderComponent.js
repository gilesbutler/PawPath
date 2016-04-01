import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Jumbotron>
      <h1>Welcome to PawPath</h1>
      <p>This is a simple tool to help find Australian suburbs by searching with a postcode or the suburb name.</p>
      </Jumbotron>
    );
  }
}
