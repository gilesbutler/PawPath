import React, { Component } from 'react';
import { Input, Glyphicon, Button } from 'react-bootstrap';

const innerGlyphicon = <Glyphicon glyph="search" />;
const innerButton = <Button>Search</Button>;

export default class Lookup extends Component {
  render() {
    return (
      <Input
        type="text"
        bsSize="large"
        placeholder="Enter a postcode or state..."
        addonBefore={innerGlyphicon}
        buttonAfter={innerButton}
        onChange={this.handleChange}
      />
    );
  }

  handleChange(event) {
    console.log(event.target.value);
  }
}
