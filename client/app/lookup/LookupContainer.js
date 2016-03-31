import React, { Component } from 'react';
import reqwest from 'reqwest';
import Lookup from './LookupComponent';
import Dispatcher from '../../dispatcher/dispatcher';
import LookupConstants from '../../constants/LookupConstants';

export default class LookupContainer extends Component {

  constructor() {
    super();

    this.state = {
      resultsActive: false,
      locations:     [],
      userLocation:  ''
    }
  }

  componentDidMount() {
    // Register callback to handle all updates
    Dispatcher.register((action) => {

      switch(action.actionType) {

        case LookupConstants.LOOKUP_SEARCH:
          // Only search the API if we have 3 or more characters
          if (action.query.length >= 3) {
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
      userLocation={this.state.userLocation}
    />;
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
          this.showLocationResults(resp.localities, query);
        }
      }
    });
  }

  showLocationResults(localities, query) {
    if (localities.hasOwnProperty('locality')) {

      let locations = [];

      // Loop through the locations
      if ( localities.locality.length ) {
        locations = localities.locality.map((locality) => {
          return locality;
        });
      }
      // If there is jsut one location...
      else {
        locations.push(localities.locality);
      }

      // Show the results
      this.setState({
        resultsActive: true,
        locations:     locations,
        userLocation:  query
      });
    }
    else {
      // No localities found
      this.showNoResultsFound();
    }
  }

  hideLocationResults(query) {
    this.setState({
      resultsActive: false,
      locations:     [],
      userLocation:  query
    });
  }

  showNoResultsFound() {

  }

  selectLocation(location) {
    this.setState({
      resultsActive: false,
      locations:     [],
      userLocation:  location
    });
  }
}
