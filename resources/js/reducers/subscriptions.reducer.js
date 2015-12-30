import { RECEIVE_SUBSCRIPTIONS, REMOVE_SUBSCRIPTION } from '../constants/ActionTypes'

export default function subscriptions(state={subscriptions: []}, action) {
  switch(action.type) {
    case RECEIVE_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions
      }
    case REMOVE_SUBSCRIPTION:
      return {
        subscriptions: [
          ...state.subscriptions.slice(0, action.index),
          ...state.subscriptions.slice(action.index + 1)
        ]
      }
    default:
      return state
  }
  
}
