import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Home extends Component {

  render() {
    const { subscriptions } = this.props.subscriptions
    // console.log(this.props);
    return (
      <div>
        <a href='/login'>Get Started!</a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    subscriptions: state.subscriptions
  } 
}


export default connect(mapStateToProps)(Home)
