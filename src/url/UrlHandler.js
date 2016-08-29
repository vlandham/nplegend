/**
 * Functions for working with URL parameters via react-router
 */

import { decode, encode } from '../utils/serialization';

export default class UrlHandler {
  /**
   * Constructor
   * @param {Object} urlQueryConfig Should take the form `{ key: { type, defaultValue }, ... }`.
   * @param {Object} browserHistory An object to control the URL in the browser (e.g.
    browserHistory from react-router). Needs the `replace` and `push` functions.
   */
  constructor(urlQueryConfig, browserHistory) {
    this.config = urlQueryConfig;
    this.browserHistory = browserHistory;
  }

  /**
   * Decodes a query based on the config.
   *
   * @param {Object} query The query object (typically from props.location.query)
   * @return {Object} the decoded values `{ key: decodedValue, ... }`
   */
  decodeQuery(query) {
    return Object.keys(this.config).reduce((decoded, key) => {
      const keyConfig = this.config[key];
      // read from the URL key if provided, otherwise use the key
      const { urlKey = key } = keyConfig;
      decoded[key] = decode(keyConfig.type, query[urlKey], keyConfig.defaultValue); // eslint-disable-line
      return decoded;
    }, {});
  }

  /**
   * Replaces the value for `key` in the query and returns the
   * new location object. If `router` is provided, router.replace
   * is called to update the URL.
   *
   * @param {Object} location react-router's location object (props.location)
   * @param {String} key the key to replace, should be in this.config
   * @param {Any} value The value to encode in the query for the key
   * @param {Boolean} [updateUrl=true] Whether to update the URL via browser history or not
   * @return {Object} A new `location` object with the updated query
   */
  replaceInQuery(location, key, value, updateUrl = true) {
    const keyConfig = this.config[key];
    // write to the URL key if provided, otherwise use the key
    const { urlKey = key } = keyConfig;

    // create the new location object
    const newLocation = {
      ...location,
      query: {
        ...location.query,
        [urlKey]: encode(keyConfig.type, value),
      },
    };

    // remove if it is the default value
    if (value === keyConfig.defaultValue) {
      delete newLocation.query[urlKey];
    }

    // if router is available, replace the URL
    if (updateUrl && this.browserHistory) {
      this.browserHistory.replace(newLocation);
    }

    return newLocation;
  }
}
