import React, { Component } from 'react'
// import SubscribeAddFeedback from './graphql/SubscribeAddFeedback.graphql'

import FeedbackPage from './FeedbackPage'

class AppState extends Component {
  state = {
    networkStatus: null
  }

  onNetworkChange = (networkStatus) => {
    this.setState({ networkStatus })
  }

  render() {
    return (
      <div>
        <FeedbackPage />
      </div>
    );
  }
}

export default AppState
