import type { Express } from 'express'
import helloWorldRoute from './hello-world'

export default (app: Express) => {
  app.use('/', helloWorldRoute)
}
