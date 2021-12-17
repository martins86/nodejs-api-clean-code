const request = require('supertest')
const app = require('../../../../src/main/config/app')

describe('Content-Type Middleware', () => {
  test('Should return JSON content-type as default', async () => {
    // Arrange
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })

    // Act & Assert
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
})
