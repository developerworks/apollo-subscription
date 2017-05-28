import { makeExecutableSchema } from 'graphql-tools'
import { pubsub } from './pubsub'
import { logger } from './logger'
import { channels } from './channels'


let feedbacks = [{
  id: 1,
  text: "text"
}]

const Schema = `
type Feedback {
  id: Int!
  text: String!
}
input FeedbackInput {
  text: String!
}
type Query {
  feedback(id: Int!): Feedback
  feedbacks: [Feedback]
  hello: String!
}
type Mutation {
  addFeedback(data: FeedbackInput!): Feedback
}
type Subscription {
  feedbackAdded: Feedback
}
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`
const Resolvers = {
  Query: {
    feedback(source, args, context, info) {
      return feedbacks[0]
    },
    feedbacks(source, args, context, info) {
      return feedbacks
    },
    hello(source, args, context, info) {
      return 'hello'
    },
  },
  Mutation: {
    addFeedback(source, args, context, info) {
      // logger.debug('Source: ', source)
      // logger.debug('Args: ', args)
      // logger.debug('Context: ', context)
      // logger.debug('Info: ', info)
      let data = args.data
      let object = {
        id: feedbacks.length + 1,
        text: data.text
      }
      feedbacks.unshift(object)
      pubsub.publish('feedbackAdded', {feedbackAdded: object})
      return object
    }
  },
  Subscription: {
    feedbackAdded: {
      subscribe: () => pubsub.asyncIterator('feedbackAdded'),
    }
  }
}
const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers
})

export default executableSchema
