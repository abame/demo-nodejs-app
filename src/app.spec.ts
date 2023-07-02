/* globals describe, expect, it */
import request from 'supertest'
import response from './database/hello-world.json'
import app from './app'

process.env.AUTH_TOKEN = 'test'

describe('Hello World API Endpoint', function () {
  it('responds to /api/v1/hello-world', async () => {
    const res = await request(app)
      .get('/api/v1/hello-world')
      .set('Authorization', 'Basic test')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(response)
  })
})
