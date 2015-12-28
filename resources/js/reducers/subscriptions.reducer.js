import { RECEIVE_SUBSCRIPTIONS } from '../constants/ActionTypes'

export default function subscriptions(state={}, action) {
  switch(action.type) {
    case RECEIVE_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions
      }
    default:
      return state
  }
  
}
