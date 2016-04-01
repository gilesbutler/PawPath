import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './HeaderStyles.css';

class Header extends Component {
  render() {
    return (
      <Jumbotron styleName="header">
      <img styleName="panda" src="/static/images/panda.png" />
      <h1>PawPath</h1>
      <p>A simple tool to help find Australian suburbs by searching with a postcode or the suburb name.</p>
      </Jumbotron>
    );
  }
}

export default CSSModules(Header, styles);
