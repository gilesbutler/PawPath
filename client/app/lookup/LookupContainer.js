import React, { Component } from 'react';
import reqwest from 'reqwest';
import Lookup from './LookupComponent';
import Dispatcher from '../../dispatcher/dispatcher';
import LookupConstants from '../../constants/LookupConstants';

export default class LookupContainer extends Component {

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
    return <Lookup />;
  }

  searchAusPostAPI(query) {
    reqwest({
      url: 'https://test.npe.auspost.com.au/api/postcode/search.json?q=' + query,
      headers: {
        'auth-key': '28744ed5982391881611cca6cf5c240'
      },
      crossOrigin: true,
      method: 'get',
      error: function (err) {
        console.log('REQWEST ERROR:');
        console.log(err);
      },
      success: function (resp) {
        console.log(resp);
      }
    });
  }
}
