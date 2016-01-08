import React, { Component, PropTypes } from 'react'

const Subscription = (props) => {
  
  const { subscription } = props

  return (
    <p style={{color: '#333'}}>
      {subscription.sender}
    </p>
  )
}

export default Subscription
