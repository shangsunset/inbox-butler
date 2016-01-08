import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class Home extends Component {

  render() {
    const { subscriptions } = this.props
    return (

        <div className="site-wrapper-inner">
          <a href="https://github.com/shangsunset/C-3PO"><img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" /></a>
          <div className="cover-container">

            <div className="masthead clearfix">
              <div className="inner">
                <h2 className="masthead-brand">
                <Link to='/'>3PO</Link>
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
