import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const componentsRoutes = {
  // the root component
  component: Home,
  // the path to show
  path: '/',
  indexRoute: {component: ArtistMain},
  // child components for home to show
  childRoutes: [
    {
      path: 'artists/new',
      // with getComponent method
      // we want that System.import() to dinamically load the component
      // and after we load it up, we call cb with this component
      getComponent(location, cb) {
        // modify the bundle in sec bundle file
        // so we add the path to module to import
        System.import('./components/artists/ArtistCreate')
          // null means load the module when everything looks ok
          .then((module) => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then((module) => cb(null, module.default))
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then((module) => cb(null, module.default))
      }
    }
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentsRoutes} />
  );
};

export default Routes;
