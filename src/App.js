import {Switch, Redirect, Route} from 'react-router-dom'

import NotFound from './components/NotFound'
import Login from './components/Login'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const sortByOptions = [
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute
      exact
      path="/"
      render={props => <Home {...props} sortingOptionsList={sortByOptions} />}
    />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
