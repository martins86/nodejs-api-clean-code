const request = require('supertest')
const app = require('../../../../src/main/config/app')

describe('JSON Parser Middleware', () => {
  test('Should parse body to JSON', async () => {
    // Arrange
    app.post('/test-json-parse', (req, res) => {
      res.send(req.body)
    })

    // Act & Assert
    await request(app)
      .post('/test-json-parse')
      .send({ name: 'test-json-parse' })
      .expect({ name: 'test-json-parse' })
  })
})
