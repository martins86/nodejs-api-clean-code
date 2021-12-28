const request = require('supertest')
const app = require('../../../../src/main/config/app')

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    // Arrange
    app.get('/test-cors', (req, res) => {
      res.send('')
    })

    // Act
    const resp = await request(app).get('/test-cors')

    // Assert
    expect(resp.headers['access-control-allow-origin']).toBe('*')
    expect(resp.headers['access-control-allow-methods']).toBe('*')
    expect(resp.headers['access-control-allow-headers']).toBe('*')
  })
})
