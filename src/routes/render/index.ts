import type { Express } from 'express'
import helloWorldRoute from './hello-world'
import homeRoute from './home'

export default (app: Express) => {
  app.use('/hello-world', helloWorldRoute)
  app.use('/', homeRoute)
}
