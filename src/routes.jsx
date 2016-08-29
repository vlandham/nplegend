import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    App,
    HomePage,
    ParkPage,
    NotFoundPage,
  } from 'containers';

export default () => (
  /**
   * Please keep routes in alphabetical order
   */
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={HomePage} />

    { /* Routes */ }
    <Route path="park/:parkId" component={ParkPage} />

    { /* Catch all route */ }
    <Route path="*" component={NotFoundPage} status={404} />
  </Route>
);
