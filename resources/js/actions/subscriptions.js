import * as types from '../constants/ActionTypes'

export const receiveSubscriptions = (data) => {
  return {
    type: types.RECEIVE_SUBSCRIPTIONS,
    subscriptions: data
  }
}

export const fetchSubscriptions = () => {
  return (dispatch) => {
    return fetch('/emails', {
        credentials: 'same-origin'
      })
      .then(checkStatus)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data.subscriptions);
        dispatch(receiveSubscriptions(data.subscriptions))
      })
      .catch(error => {
        console.error(error)
      })
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
