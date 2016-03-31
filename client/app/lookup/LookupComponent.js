import React, { Component } from 'react';
import { Input, Glyphicon, Button } from 'react-bootstrap';
import LookupActions from './LookupActions';

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
    event.stopPropagation();
    LookupActions.search(event.target.value);
  }
}
