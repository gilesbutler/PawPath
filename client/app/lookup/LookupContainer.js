import React, { Component } from 'react';
import reqwest from 'reqwest';
import Lookup from './LookupComponent';
import Dispatcher from '../../dispatcher/dispatcher';
import LookupConstants from '../../constants/LookupConstants';
import Config from '../../config.js';

export default class LookupContainer extends Component {

  constructor() {
    super();

    this.state = {
      resultsActive: false,
      locations:     [],
      userSelection: null
    }
  }

  componentDidMount() {
    // Register callback to handle all updates
    Dispatcher.register((action) => {

      switch(action.actionType) {

        case LookupConstants.LOOKUP_SEARCH:
          // Only search the API if we have 3 or more characters
          if (action.query.length >= 3) {
            // We need to set state here to prevent the UI from lagging
            this.setState({
              locations:     [],
              userSelection: action.query
            });
            
            this.searchAusPostAPI(action.query);
          }
          else {
            this.hideLocationResults(action.query);
          }
          break;

        case LookupConstants.LOOKUP_SELECT_LOCATION:
          // Set the location to what the user has selected
          this.selectLocation(action.text);
          break;

        default:
          // no op
      }
    });
  }

  render() {
    return <Lookup
      resultsActive={this.state.resultsActive}
      locations={this.state.locations}
      userSelection={this.state.userSelection}
    />;
  }

  searchAusPostAPI(query) {
    // Send the request to Aus Post
    reqwest({
      url: 'https://test.npe.auspost.com.au/api/postcode/search.json?q=' + query,
      headers: {
        'auth-key': Config.keys.auspost
      },
      crossOrigin: true,
      method: 'get',
      error: (err) => {
        console.log('REQWEST ERROR:');
        console.log(err);
      },
      success: (resp) => {
        if (resp && resp.hasOwnProperty('localities')) {
          this.showLocationResults(resp.localities, query);
        }
      }
    });
  }

  showLocationResults(localities, query) {
    if (localities.hasOwnProperty('locality')) {

      let locations = [];

      // If there is just one location...
      if ( !localities.locality.length ) {
        locations.push(localities.locality);
      }
      // Loop through the locations
      else {
        locations = localities.locality;
      }

      // Show the results
      this.setState({
        resultsActive: true,
        locations:     locations
      });
    }
  }

  hideLocationResults(query) {
    this.setState({
      resultsActive: false,
      locations:     [],
      userSelection: query
    });
  }

  selectLocation(location) {
    this.setState({
      resultsActive: false,
      locations:     [],
      userSelection: location
    });
  }
}
