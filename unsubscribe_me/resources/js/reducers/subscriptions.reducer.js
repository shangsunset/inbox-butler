import { RECEIVE_SUBSCRIPTIONS, REMOVE_SUBSCRIPTION, INFORM_SESSION_EXPIRED } from '../constants/ActionTypes'

export default function subscriptions(state={
  subscriptions: [],
  isSessionExpired: false,
  }, action) {
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
    case INFORM_SESSION_EXPIRED:
      return {
        ...state,
        isSessionExpired: true
      }
    default:
      return state
  }
}
