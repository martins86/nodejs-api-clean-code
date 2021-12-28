const request = require('supertest')

describe('Content-Type Middleware', () => {
  let app

  beforeEach(() => {
    jest.resetModules()
    app = require('../../../../src/main/config/app')
  })

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

  test("Should return xml content-type if forced", async () => {
    // Arrange
    app.get("/test-content-type", (req, res) => {
      res.type('xml')
      res.send("")
    })

    // Act & Assert
    await request(app)
      .get("/test-content-type")
      .expect("content-type", /xml/)
  })
})
