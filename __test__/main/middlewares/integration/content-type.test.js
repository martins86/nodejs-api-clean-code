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

  test("Should return xml content-type if forced", async () => {
    // Arrange
    app.get("/test-content-type-xml", (req, res) => {
      res.type('xml')
      res.send("")
    })

    // Act & Assert
    await request(app)
      .get("/test-content-type-xml")
      .expect("content-type", /xml/)
  })
})
