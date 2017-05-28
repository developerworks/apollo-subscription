import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, gql, withApollo, compose } from 'react-apollo'

// 查询文本
import QUERY_FEEDBACKS from './graphql/ListFeedback.graphql'
import SUBSCRIPTION_NEW_FEEDBACKS from './graphql/SubscribeAddFeedback.graphql'

// 反馈列表组件
class FeedbackList extends Component {
  // constructor(props) {
  //   super(props)
  // }
  componentWillMount() {
    this.props.subscribeToNewFeedback();
  }
  render() {
    console.log('FeedbackList Props: ', this.props.data.feedbacks)
    if(this.props.data.loading == true) {
      return <div>Loading...</div>
    } else {
      return (
        <ul>{
          this.props.data.feedbacks.map((item, index) => {
            console.log(item.id)
            return (
              <div key={item.id}>{item.text}</div>
            )
          })
        }</ul>
      )
    }

  }
}
// 属性验证
FeedbackList.propTypes = {
  subscribeToNewFeedback: PropTypes.func.isRequired
}
// 高阶组件
export default graphql(QUERY_FEEDBACKS, {
  // name: 'FeedbackList',
  options: ({ params }) => ({
    variables: {
      key: 'value'
    },
  }),
  alias: 'FeedbackListWithData'
})(FeedbackList);
