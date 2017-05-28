import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, gql, withApollo, compose } from 'react-apollo'

import SUBSCRIPTION_NEW_FEEDBACKS from './graphql/SubscribeAddFeedback.graphql'
import MUTATION_ADD_FEEDBACK from './graphql/AddFeedback.graphql'
import QUERY_FEEDBACKS from './graphql/ListFeedback.graphql'

import FeedbackList from './FeedbackList'

const withData = graphql(QUERY_FEEDBACKS, {
  name: 'ListFeedback',
  options: ({ params }) => ({
    variables: {
      key: 'value'
    },
  }),
  alias: 'FeedbackPage',
  props: props => {
    console.log(props)
    return {
      subscribeToNewFeedback: params => {
        return props.ListFeedback.subscribeToMore({
          document: SUBSCRIPTION_NEW_FEEDBACKS,
          variables: {
            test: 'test'
          },
          updateQuery: (prev, { subscriptionData }) => {
            console.log('Prev: ', prev)
            if (!subscriptionData.data) {
              return prev;
            }
            const newFeedbackItem = subscriptionData.data.feedbackAdded;
            console.log('New Feedback Item', newFeedbackItem)
            return Object.assign({}, prev, {
              feedbacks: [newFeedbackItem, ...prev.feedbacks]
            });
          }
        });
      }
    };
  },
});


export default withData(FeedbackList)
