import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './header/HeaderComponent';
import Body from './body/BodyComponent';

export default class App extends Component {
  render() {
    return (
      <Grid>

        <Row>
          <Col xs={12}>
            <Header />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Body />
          </Col>
        </Row>

      </Grid>
    );
  }
}
