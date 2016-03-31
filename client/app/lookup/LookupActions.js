import React, { Component } from 'react';
import Dispatcher from '../../dispatcher/dispatcher';
import LookupConstants from '../../constants/LookupConstants';

export default {

  search(query) {
    Dispatcher.dispatch({
      actionType: LookupConstants.LOOKUP_SEARCH,
      query: query
    });
  }

}
