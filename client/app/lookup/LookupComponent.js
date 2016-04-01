import React, { Component } from 'react';
import { Input, Glyphicon, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './LookupStyles.css';
import LookupActions from './LookupActions';

const innerGlyphicon = <Glyphicon glyph="search" />;
const innerButton = <Button>SEARCH</Button>;

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
        >
          {locality.location}
        </ListGroupItem>
      );
    }, this);

    return (
      <div>
        <Input
          type="text"
          value={userSelection}
          bsSize="large"
          placeholder="Enter a postcode or state..."
          addonBefore={innerGlyphicon}
          buttonAfter={innerButton}
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

    LookupActions.selectLocation(event.target.innerText);
  }
}

export default CSSModules(Lookup, styles);
