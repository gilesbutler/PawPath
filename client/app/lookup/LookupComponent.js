import React, { Component } from 'react';
import { Input, Glyphicon, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './LookupStyles.css';
import LookupActions from './LookupActions';

const innerGlyphicon = <Glyphicon glyph="search" />;
const innerButton = <Button>Search</Button>;

class Lookup extends Component {
  render() {
    let searchResultsStyles = this.props.resultsActive ? 'search-results-active' : 'search-results';
    let locations           = this.props.locations;
    console.log(locations);

    locations = locations.map(function(locality, index) {
      return (
        <ListGroupItem key={index}>{locality.location}</ListGroupItem>
      );
    }, this);

    return (
      <div className="Lookup-form">
        <Input
          type="text"
          bsSize="large"
          placeholder="Enter a postcode or state..."
          addonBefore={innerGlyphicon}
          buttonAfter={innerButton}
          onChange={this.handleChange}
          className="Lookup-input"
        />

        <Panel
          ref="lookup-search-results"
          styleName={searchResultsStyles}
        >
          <ListGroup fill>
            {locations}
          </ListGroup>
        </Panel>
      </div>
    );
  }

  handleChange(event) {
    event.stopPropagation();

    // Only search the API if we have more than 3 characters
    LookupActions.search(event.target.value);
  }
}

export default CSSModules(Lookup, styles);
