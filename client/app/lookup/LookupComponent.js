import React, { Component } from 'react';
import { Input, Glyphicon, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './LookupStyles.css';
import LookupActions from './LookupActions';

const innerGlyphicon = <Glyphicon glyph="search" />;

class Lookup extends Component {
  propTypes: {
    locations:     React.PropTypes.string,
    userSelection: React.PropTypes.Array,
    resultsActive: React.PropTypes.bool,
  }

  render() {

    let searchResultsStyles = this.props.resultsActive ? 'search-results-active' : 'search-results';
    let locations           = this.props.locations;
    let userSelection       = this.props.userSelection;

    locations = locations.map(function(locality, index) {
      return (
        <ListGroupItem
          key={index}
          onClick={this.handleListItemClick}
          styleName="search-result"
          title={locality.location}
        >
          {locality.location} <span>(<em>{locality.state} - {locality.postcode}</em>)</span>
        </ListGroupItem>
      );
    }, this);

    return (
      <div>
        <Input
          type="text"
          value={userSelection}
          bsSize="large"
          placeholder="Enter a postcode or suburb..."
          addonBefore={innerGlyphicon}
          onChange={this.handleInputChange}
          styleName="search-input"
        />

        <Panel
          styleName={searchResultsStyles}
        >
          <ListGroup fill>
            {locations}
          </ListGroup>
        </Panel>
      </div>
    );
  }

  handleInputChange(event) {
    LookupActions.search(event.target.value);
  }

  handleListItemClick(event) {
    event.stopPropagation();
    LookupActions.selectLocation(event.currentTarget.title);
  }
}

export default CSSModules(Lookup, styles);
