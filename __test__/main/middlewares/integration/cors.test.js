const request = require('supertest')
const app = require('../../../../src/main/config/app')

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    // Arrange
    app.get('/test-cors', (req, res) => {
      res.send('')
    })

    // Act
    const res = await request(app).get('/test-cors')

    // Assert
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
