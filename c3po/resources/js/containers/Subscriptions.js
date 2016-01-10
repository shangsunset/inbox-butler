import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notification from 'react-notification'
import * as SubscriptionActions from '../actions/subscriptions.action'
import SubscriptionItem from '../components/SubscriptionItem'

class Subscriptions extends Component {
  constructor(props) {
    super()
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
    this.onNotificationDismiss = this.onNotificationDismiss.bind(this)
    this.state = {
      showNotification: false,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(SubscriptionActions.fetchSubscriptionIfNeeded())
  }

  handleUnsubscribe(index, method, sender) {
    
    const { dispatch } = this.props
    dispatch(SubscriptionActions.sendUnsubscribeRequest(index, method, sender))
    this.setState({
      showNotification: true,
      unsubscribingFrom: sender
    })

  }

  onNotificationDismiss() {
    this.setState({showNotification: false})
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
        partial = <p>this may take a while...</p>
      }
    }

    return (
      <div style={{height: '100%', marginTop: 130 }} className="col-md-8 col-md-offset-2">
        
        <Notification
          isActive={this.state.showNotification}
          message={`You have unsubscribed from ${this.state.unsubscribingFrom}`}
          dismissAfter={3000}
          onDismiss={this.onNotificationDismiss}
        />
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
