import React, { Component, PropTypes } from 'react'
import Subscription from './Subscription'


const SubscriptionItem = (props) => {
  
  const { subscription } = props

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-6">
          <Subscription subscription={subscription} />
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-success pull-right"
            onClick={() => props.handleUnsubscribe()}>
            Unsubscribe
          </button>
        </div>
      </div>
    </li>
  )
}

export default SubscriptionItem
