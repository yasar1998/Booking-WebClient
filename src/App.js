import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from './components/TopNav';
import PrivateRoute from './components/PrivateRoute';

import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './user/Dashboard';
import DashboardNav from './components/DashboardNav';
import DashboardSeller from './user/DashboardSeller';
import NewProperty from './properties/NewProperty';
import EditProperty from './properties/EditProperty';
import ViewProperty from './properties/ViewProperty';
import SearchResult from './properties/SearchResult';
import StripeCallback from './stripe/StripeCallback';
import StripeSuccess from './stripe/StripeSuccess';
import StripeCancel from './stripe/StripeCancel';

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center"/>
      <Switch>
        <Route exact path = '/' component = {Home} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/register' component = {Register} />
        <PrivateRoute exact path = '/dashboard' component = {Dashboard} />
        <PrivateRoute exact path = '/dashboard/seller' component = {DashboardSeller} />
        <PrivateRoute exact path = '/properties/new' component = {NewProperty} />
        <PrivateRoute exact path = '/stripe/callback' component = {StripeCallback} />
        <PrivateRoute exact path = '/property/edit/:propertyId' component = {EditProperty} />
        <Route exact path = '/property/:propertyId' component = {ViewProperty} />
        <Route exact path = '/search-result' component = {SearchResult} />
        <PrivateRoute exact path = '/stripe/success/:propertyId' component = {StripeSuccess} />
        <PrivateRoute exact path = '/stripe/cancel' component = {StripeCancel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;