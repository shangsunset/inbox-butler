import React, { Component, PropTypes } from 'react'

const Subscription = (props) => {
  
  const { subscription } = props

  return (
    <div>
      {subscription.sender}
    </div>
  )
}

export default Subscription
