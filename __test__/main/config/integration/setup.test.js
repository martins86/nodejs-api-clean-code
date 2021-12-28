const request = require('supertest')
const app = require('./../../../../src/main/config/app')

describe('App Setup', () => {
  test('Should disable x-powered-by header', async () => {
    // Arrange
    app.get('/test-x-powered-by', (req, res) => {
      res.send('')
    })

    // Act
    const resp = await request(app).get('/test-x-powered-by')

    // Assert
    expect(resp.headers['x-powered-by']).toBeUndefined()
  })
})
