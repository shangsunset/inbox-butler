import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Home extends Component {

  render() {
    const { subscriptions } = this.props.subscriptions
    return (
      <div>
        <a href='/login'>Get Started!</a>

        <Link to='/subscriptions'>Your Subscriptions</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  } 
}

export default connect(mapStateToProps)(Home)
