import dotenv from 'dotenv'
import express from 'express'
import nunjucks from 'nunjucks'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { createWriteStream } from 'fs'
import { join } from 'path'
import type { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import routes from './routes'

dotenv.config()

const app = express()

app.use((request: Request, response: Response, next: NextFunction) => {
  const requestID = uuidv4()
  request.headers['X-Request-Id'] = requestID
  response.set('X-Request-Id', requestID)
  next()
})

morgan.token('id', (request: Request) => {
  return request.headers['X-Request-Id'] as string
})

// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
const accessLogStream = createWriteStream(join(__dirname, 'access.log'), {
  flags: 'a'
})
app.use(
  morgan(
    ':date[iso] - :id - :remote-addr - :method :url - :response-time ms',
    { stream: accessLogStream }
  )
)

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.set('view engine', 'html')

routes(app)

export default app
