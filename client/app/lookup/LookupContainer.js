import React, { Component } from 'react';
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
    console.log(query);
  }
}
