/**
 * Reducer for globalSearch
 */
import * as Actions from './actions';

const initialState = {
  locationSearch: {
    data: [],
    query: '',
    isFetching: false,
    isFetched: false,
  },
};

// the location page reducer
function locationSearch(state = initialState.locationSearch, action = {}) {
  switch (action.type) {
    case Actions.FETCH_LOCATION_SEARCH:
      return {
        data: state.data,
        query: action.searchQuery,
        isFetching: true,
        isFetched: false,
      };
    case Actions.FETCH_LOCATION_SEARCH_SUCCESS:
      return {
        ...state,
        data: action.result.results,
        query: action.searchQuery,
        isFetching: false,
        isFetched: true,
      };
    case Actions.FETCH_LOCATION_SEARCH_FAIL:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: action.error,
      };
    default:
      return state;
  }
}

// The root reducer
function globalSearch(state = initialState, action = {}) {
  switch (action.type) {
    case Actions.FETCH_LOCATION_SEARCH:
    case Actions.FETCH_LOCATION_SEARCH_SUCCESS:
    case Actions.FETCH_LOCATION_SEARCH_FAIL:
      return {
        ...state,
        locationSearch: locationSearch(state.locationSearch, action),
      };
    default:
      return state;
  }
}


// Export the reducer
export default globalSearch;
