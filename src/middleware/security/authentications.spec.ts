/* globals describe, expect, it, jest */
import authentication from './authentication'
import type { Request, Response, NextFunction } from 'express'

const nextFunction: NextFunction = jest.fn()
const mockResponse = {
  status: jest.fn().mockImplementationOnce(() => {
    return {
      send: jest.fn()
    }
  })
} as unknown as Response

describe('Authentication Middleware', () => {
  it('next should be called if request is authenticated', () => {
    process.env.AUTH_TOKEN = 'test'
    const mockRequest = {
      headers: {
        authorization: 'Basic test'
      }
    } as unknown as Request
    authentication(mockRequest, mockResponse, nextFunction)
    expect(nextFunction).toHaveBeenCalledTimes(1)
  })
  it('should return 403 if request is not authenticated', () => {
    process.env.AUTH_TOKEN = 'test'
    const mockRequest = {
      headers: {
        authorization: 'test'
      }
    } as unknown as Request
    authentication(mockRequest, mockResponse, nextFunction)
    expect(mockResponse.status).toHaveBeenCalledWith(403)
  })
})
