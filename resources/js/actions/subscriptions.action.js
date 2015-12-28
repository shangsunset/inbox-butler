import * as types from '../constants/ActionTypes'

export const receiveSubscriptions = (data) => {
  return {
    type: types.RECEIVE_SUBSCRIPTIONS,
    subscriptions: data
  }
}

export function removeSubscription() {
  return {
    type: types.REMOVE_SUBSCRIPTION
  }
}

export const fetchSubscriptions = () => {
  return (dispatch) => {

      fetch('/api/subscriptions', {
        credentials: 'same-origin'
      })
      .then(checkStatus)
      .then(response => {
        return response.json()
      })
      .then(data => {
        dispatch(receiveSubscriptions(data.subscriptions))
      })
      .catch(error => {
        console.error(error)
      })
  }
}

export function unsubscribe(link) {
  return dispatch => {
    
    fetch('/unsubscribe', {
      method: 'post',
      credentials: 'same-origin',
      body: JSON.stringify({'link': link})
    })
    .then(checkStatus)
    .then(response => {
      return response.json()
    })
    .then(data => (
      dispatch(removeSubscription())
    ))

  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
