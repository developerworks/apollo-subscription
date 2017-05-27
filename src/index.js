import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import schema from './schema'
import { configure_logger, logger } from './logger'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', bodyParser.json(), graphqlExpress({
  schema: schema
}))
app.use('/graphiql', graphiqlExpress({
  endpointURL: 'http://localhost:7001/api',
  subscriptionsEndpoint: 'ws://localhost:7003/feedback'
}));

const WS_PORT   = 7003
const HTTP_PORT = 7001

/**
 * HTTP服务器
 */
const httpServer = createServer(app)
httpServer.listen(HTTP_PORT, () => {
  console.log(`API Server is now running on http://localhost:7001/api`)
  console.log(`GraphiQL Tool at http://localhost:7001/graphiql`)
  console.log(`API Subscriptions server is now running on ws://localhost:7001/feedback`)
})

/**
 * Websocket 服务器
 */
const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})
websocketServer.listen(WS_PORT, () => {
  logger.info(`Websocket Server is now running on http://localhost:${WS_PORT}`)
})

/**
 * 订阅服务器
 */
const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: websocketServer, path: '/feedback' }
)
