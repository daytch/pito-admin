import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//import PrivateRoutes
import PrivateRoute from 'Routes/PrivateRoute'

//import pages admin
import Login from 'pages/login'
import ForgotPassword from 'pages/forgotPassword'
import Dashboard from 'pages/dashboard'
import DashboardDetail from 'pages/dashboard-detail'
import LivestreamList from 'pages/livestream-list'
import LivestreamDetail from 'pages/livestream-detail'
import MerchantList from 'pages/merchant-list'
import MerchantDetail from 'pages/merchant-detail'
import MerchantEdit from 'pages/merchant-edit'
import UserListing from 'pages/user-list'
import Tickets from 'pages/tickets'
import Categories from 'pages/categories'
import Analytic from 'pages/analytic'
import userDetail from 'pages/user-detail'
import NotFound404 from 'pages/404'


//style from tailwindcss
import 'assets/css/main.css';
import TicketDetail from 'pages/ticketDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
        <Route path="/dashboard"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={Dashboard} exact />
              <PrivateRoute path={`${url}/detail/:id`} component={DashboardDetail} exact />
            </>
          )} />
        <Route path="/livestream"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={LivestreamList} exact />
              <PrivateRoute path={`${url}/detail/:id`} component={LivestreamDetail} exact />
            </>
          )} />
        <Route path="/merchant"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={MerchantList} exact />
              <PrivateRoute path={`${url}/:id`} component={MerchantDetail} exact />
              <PrivateRoute path={`${url}/edit/:id`} component={MerchantEdit} exact />
            </>
          )} />
        <Route path="/user"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={UserListing} exact />
              <PrivateRoute path={`${url}/:id`} component={userDetail} />
            </>
          )} />
        <Route path="/ticket"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={Tickets} exact />
              <PrivateRoute path={`${url}/:id`} component={TicketDetail} />
            </>
          )} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/analytic" component={Analytic} />

        <Route path="*" component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default App;
