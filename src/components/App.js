import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import ShipmentDetail from './pages/ShipmentDetail';


export default () => (
  <Layout>
    <Switch>
      <Route path="/ShipmentDetail/:id" component={ShipmentDetail} />
      <Route path="/ShipmentDetail" component={ShipmentDetail} />
      <Route path="/" component={Home} />
    </Switch>
  </Layout>
);
