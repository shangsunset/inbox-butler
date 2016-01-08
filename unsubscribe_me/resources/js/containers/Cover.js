import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Cover extends Component {

  render() {
    const { subscriptions } = this.props
    return (
        <div>
          <h1 className="cover-heading">Say bye to annoying subscriptions</h1>
          <p className="lead">Unsubscribe Me is born out of frustration to annoying subscriptions. It helps you unsubscribe from various newsletters with just on click :)</p>
          <p className="lead">
            <a href="/login" className="btn btn-lg btn-default">Get Started!</a>
          </p>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  } 
}

export default connect(mapStateToProps)(Cover)
