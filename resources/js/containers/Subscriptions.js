import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchSubscriptions } from '../actions/subscriptions.action'
import SubscriptionItem from '../components/SubscriptionItem'

class Subscriptions extends Component {

  componentDidMount() {
    const { actions } = this.props
    actions.fetchSubscriptions()
  }

  handleUnsubscribe() {
    
    console.log('un-subscribing');
  }

  render() {
    let partial
    const { subscriptions } = this.props
    if (subscriptions.length > 0) {
      partial = (
        subscriptions.map((subscription, index) => 
          <SubscriptionItem
            key={index}
            subscription={subscription}
            handleUnsubscribe={this.handleUnsubscribe}
          />
        )
      )
    } else {
      partial = <p>loading...</p>
    }

    return (
      <div className="col-md-8 col-md-offset-2">
        <ul className="list-group">
          { partial }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  } 
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchSubscriptions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions)
