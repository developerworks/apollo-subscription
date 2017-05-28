import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, gql, withApollo, compose } from 'react-apollo'

// 查询文本
// import QUERY_FEEDBACKS from './graphql/ListFeedback.graphql'
// import SUBSCRIPTION_NEW_FEEDBACKS from './graphql/SubscribeAddFeedback.graphql'

const QUERY_FEEDBACKS = gql`
  query ListFeedback {
      feedbacks {
          id
          text
      }
  }
`
const SUBSCRIPTION_NEW_FEEDBACKS = gql`
  subscription SubscribeAddFeedback {
    feedbackAdded {
      id
      text
    }
  }
`


// 反馈列表组件
class FeedbackList extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    // this.props.subscribeToNewFeedback();
  }
  render() {
    console.log(this.props)
    return (
      <p>text</p>
    )

  }
}

/*return (
  <div>
    <ul>{
      this.props.data.feedbacks.map((item, index) => {
        <li>
          <span>{item.id}</span>
          <span>{item.text}</span>
        </li>
      })
    }</ul>
  </div>
)*/

// 属性验证
// FeedbackList.propTypes = {
//   subscribeToNewFeedback: PropTypes.func.isRequired
// }

// 高阶组件
export default graphql(QUERY_FEEDBACKS, {
  name: 'FeedbackList',
  options: ({ params }) => ({
    variables: {
      key: 'value'
    },
  }),
  props: props => {
    return {
      subscribeToNewFeedback: params => {
        return props.feedbacks.subscribeToMore({
          document: SUBSCRIPTION_NEW_FEEDBACKS,
          variables: {
            repoName: params.repoFullName,
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const newFeedItem = subscriptionData.data.feedbackAdded;
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
})(FeedbackList);
