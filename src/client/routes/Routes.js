import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const loading = () => <div className="loading" />;

const Home = Loadable({ loader: () => import('../components/pages/Home'), loading });
const Detail = Loadable({ loader: () => import('../components/pages/Detail'), loading });
const Search = Loadable({ loader: () => import('../components/pages/Search'), loading });
const NotFound = Loadable({ loader: () => import('../components/pages/NotFound'), loading });

export default () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/items/:id" component={Detail} />
    <Route path="/items" component={Search} />
    <Route component={NotFound} />
  </Switch>
);
