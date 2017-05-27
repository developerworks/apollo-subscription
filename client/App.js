import React, { Component } from 'react'
// import SubscribeAddFeedback from './graphql/SubscribeAddFeedback.graphql'

import FeedbackList from './FeedbackList'

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
        <FeedbackList />
      </div>
    );
  }
}

export default AppState
