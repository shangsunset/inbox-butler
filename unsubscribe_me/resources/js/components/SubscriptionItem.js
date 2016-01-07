import React, { Component, PropTypes } from 'react'
import Subscription from './Subscription'


const SubscriptionItem = (props) => {
  
  const { subscription } = props
  const methods = subscription['unsubscribe_methods']
  let method = {}
  if ('mailto' in methods) {
    let email = methods['mailto'].split('mailto:')[1]
    if (email.indexOf('?subject=') !== -1) {
      const parts = email.split('?subject=')
      method['email'] = parts[0]
      method['subject'] = parts[1]
    } else {
      method['email'] = email
      method['subject'] = 'unsubscribe'
    }
  } else {
    method['link'] = methods['link']
  }

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-6">
          <Subscription subscription={subscription} />
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-success pull-right"
            onClick={() => props.handleUnsubscribe(props.index, method, subscription['sender'])}>
            Unsubscribe
          </button>
        </div>
      </div>
    </li>
  )
}

export default SubscriptionItem
