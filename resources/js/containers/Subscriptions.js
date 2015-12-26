import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchSubscriptions } from '../actions/subscriptions'

class Subscriptions extends Component {

  componentDidMount() {
    const { subscriptions, dispatch } = this.props
    dispatch(fetchSubscriptions())
  }

  render() {
    return (
      <div>
        tsetdsfadsf
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.Subscriptions
  } 
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(SubscriptionActions, dispatch)
//   }
// }

export default connect(mapStateToProps)(Subscriptions)
