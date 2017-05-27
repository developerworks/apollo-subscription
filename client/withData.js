  /**
   * 订阅函数的基本结构
   */
  subscribeToNewFeedback() {
    this.subscription = this.props.data.subscribeToMore({
      // GraphQL订阅
      document: gql`
        subscription OnAddFeedback {
          feedbackAdded {
            id
            text
          }
        }
      `,
      // 订阅变量
      variables: {
        subscriptionFilter: {
          channelId: {
            // We're using react-router and grabbing the channelId from the url
            // to designate which channel to subscribe to
            eq: this.props.params ? this.props.params.channelId : null
          }
        }
      },
      // 更新函数, 当有新的订阅数据时, 更新UI以反映变化
      updateQuery: (prev, { subscriptionData }) => {
      },
    });
  }
