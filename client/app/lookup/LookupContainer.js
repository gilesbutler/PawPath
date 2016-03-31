import React, { Component } from 'react';
import reqwest from 'reqwest';
import Lookup from './LookupComponent';
import Dispatcher from '../../dispatcher/dispatcher';
import LookupConstants from '../../constants/LookupConstants';

export default class LookupContainer extends Component {

  constructor() {
    super();

    this.state = {
      resultsActive: false
    }
  }

  componentDidMount() {
    // Register callback to handle all updates
    Dispatcher.register((action) => {

      switch(action.actionType) {
        case LookupConstants.LOOKUP_SEARCH:
          this.searchAusPostAPI(action.query);
          break;

        default:
          // no op
      }
    });
  }

  render() {
    let resultsActive = this.state.resultsActive;

    return <Lookup resultsActive={resultsActive} />;
  }

  searchAusPostAPI(query) {
    // Send the request to Aus Post
    reqwest({
      url: 'https://test.npe.auspost.com.au/api/postcode/search.json?q=' + query,
      headers: {
        'auth-key': '28744ed5982391881611cca6cf5c240'
      },
      crossOrigin: true,
      method: 'get',
      error: (err) => {
        console.log('REQWEST ERROR:');
        console.log(err);
        this.showNoResultsFound()
      },
      success: (resp) => {
        if (resp && resp.hasOwnProperty('localities')) {
          this.showLocations(resp.localities);
        }
      }
    });
  }

  showLocations(localities) {
    if (localities.hasOwnProperty('locality')) {
      // Loop through the locations
      this.setState({
        resultsActive: true
      });

      localities.locality.map((locality) => {
        console.log(locality);
      });
    }
    else {
      // No localities found
      this.showNoResultsFound();
    }
  }

  showNoResultsFound() {

  }
}
