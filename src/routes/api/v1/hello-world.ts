import type { Request, Response } from 'express'
import express from 'express'
import authentication from '../../../middleware/security/authentication'

const router = express.Router()

router.get('/', authentication, (_request: Request, response: Response) => {
  response.json({
    status: 'success',
    message: 'Hello World API!',
    products: [
      {
        id: '1',
        name: 'MacBook Pro'
      },
      {
        id: '2',
        name: 'HP'
      },
      {
        id: '3',
        name: 'Dell'
      }
    ]
  })
})
export default router
