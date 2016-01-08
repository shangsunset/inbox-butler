import React from 'react'
import 'babel-core/polyfill'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from './store/configureStore'
import Home from './containers/Home'
import Cover from './containers/Cover'
import Subscriptions from './containers/Subscriptions'

let history = createBrowserHistory()
const store = configureStore()

const App = React.createClass({
  render() {
    return (
      <div className="site-wrapper">
        {this.props.children}
      </div>
    )
  }
})


render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route component={Home}>
          <Route path="/" component={Cover} />
          <Route path="/subscriptions" component={Subscriptions} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
