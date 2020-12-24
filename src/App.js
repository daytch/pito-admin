import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//import PrivateRoutes
import PrivateRoute from 'Routes/PrivateRoute'
// import PrivateMerchantRoute from 'Routes/PrivateMerchantRoute'

//import pages admin
import Login from 'pages/login'
import ForgotPassword from 'pages/forgotPassword'
import Dashboard from 'pages/dashboard'
import LivestreamList from 'pages/livestream-list'
import MerchantList from 'pages/merchant-list'
import MerchantDetail from 'pages/merchant-detail'
import UserListing from 'pages/user-list'
import Tickets from 'pages/tickets'
import Categories from 'pages/categories'
import Analytic from 'pages/analytic'
import userDetail from 'pages/user-detail'
import NotFound404 from 'pages/404'

//style from tailwindcss
import 'assets/css/main.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/livestream-list" component={LivestreamList} />
        <Route path="/merchant-list"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={MerchantList} exact />
              <PrivateRoute path={`${url}/:id`} component={MerchantDetail} />
            </>
          )} />
        <Route path="/user-list"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={UserListing} exact />
              <PrivateRoute path={`${url}/:id`} component={userDetail} />
            </>
          )} />
        <PrivateRoute path="/tickets" component={Tickets} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/analytic" component={Analytic} />
       
        <Route path="*" component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default App;
