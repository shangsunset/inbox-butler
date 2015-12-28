import React from 'react'
import 'babel-core/polyfill'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from './store/configureStore'
import Home from './containers/Home'
import Subscriptions from './containers/Subscriptions'

let history = createBrowserHistory()
const store = configureStore()

const App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})


render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/subscriptions" component={Subscriptions} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
