import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, gql, withApollo, compose } from 'react-apollo'

import SUBSCRIPTION_NEW_FEEDBACKS from './graphql/SubscribeAddFeedback.graphql'
import MUTATION_ADD_FEEDBACK from './graphql/AddFeedback.graphql'

class FeedbackPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.props.data.feedbacks.map((item, index) => {
              <li>
                <span>{item.id}</span>
                <span>{item.text}</span>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}
FeedbackPage.propTypes = {
  subscribeToNewFeedback: PropTypes.func.isRequired
}

const withData = graphql(ListFeedback, {
  name: 'ListFeedback',
  options: ({ params }) => ({
    variables: {
      repoName: `${params.org}/${params.repoName}`
    },
  }),
  props: props => {
    return {
      subscribeToNewFeedback: params => {
        return props.feedbacks.subscribeToMore({
          document: SUBSCRIPTION_NEW_FEEDBACKS,
          variables: {
            name: 'value'
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const newItem = subscriptionData.data.feedbackAdded;
            return Object.assign({}, prev, {
              entry: {
                feedbacks: [newFeedItem, ...prev.entry.feedbacks]
              }
            });
          }
        });
      }
    };
  },
});


export default withData(FeedbackPage)
