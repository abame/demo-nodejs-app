import { Express } from 'express'
import v1 from './api/v1'
import render from './render'

export default (app: Express) => {
  v1(app)
  render(app)
}
