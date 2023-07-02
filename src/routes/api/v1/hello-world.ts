import type { Request, Response } from 'express'
import express from 'express'
import apiResponse from '../../../database/hello-world.json'
import authentication from '../../../middleware/security/authentication'

const router = express.Router()

router.get('/', authentication, (_request: Request, response: Response) => {
  response.json(apiResponse)
})
export default router
