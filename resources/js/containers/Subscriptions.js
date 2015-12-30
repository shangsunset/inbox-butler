import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SubscriptionActions from '../actions/subscriptions.action'
import SubscriptionItem from '../components/SubscriptionItem'

class Subscriptions extends Component {
  constructor(props) {
    super()
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(SubscriptionActions.fetchSubscriptions())
  }

  handleUnsubscribe(index, method) {
    
    const { dispatch } = this.props
    dispatch(SubscriptionActions.sendUnsubscribeRequest(index, method))

  }

  render() {
    let partial
    const { subscriptions, isSessionExpired } = this.props
    if (isSessionExpired) {
      partial = <h2>Session has expired</h2>
    } else {

      if (subscriptions.length > 0) {
        partial = (
          subscriptions.map((subscription, index) => 
            <SubscriptionItem
              key={index}
              index={index}
              subscription={subscription}
              handleUnsubscribe={this.handleUnsubscribe}
            />
          )
        )
      } else {
        partial = <p>loading...</p>
      }
    }

    return (
      <div className="col-md-8 col-md-offset-2">
        
        <Link to='/'>Home</Link>
        <ul className="list-group">
          { partial }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions,
    isSessionExpired: state.isSessionExpired
  } 
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({ SubscriptionActions }, dispatch)
//   }
// }

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Subscriptions)
