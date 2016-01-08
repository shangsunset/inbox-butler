import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Home extends Component {

  render() {
    const { subscriptions } = this.props
    return (

        <div className="site-wrapper-inner">
          <div className="cover-container">

            <div className="masthead clearfix">
              <div className="inner">
                <h2 className="masthead-brand">
                <Link to='/'>Unsubscribe Me</Link>
                </h2>
                <nav>
                  <ul className="nav masthead-nav">
                    <li>
                    { subscriptions.length > 0 ?
                        <Link to='/subscriptions'>Your Subscriptions</Link>
                      :
                        null
                    }
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="inner cover">
              {this.props.children}
            </div>
          </div>

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
