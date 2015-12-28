import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import subscriptions from '../reducers/subscriptions.reducer'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)

export default function configureStore() {

  const store = createStoreWithMiddleware(subscriptions)

  return store
}
