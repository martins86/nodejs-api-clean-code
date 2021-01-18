class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email || !httpRequest.body.password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    // Arrange
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    // Assert
    const httpResponse = sut.route(httpRequest)

    // Act
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no password is provided', () => {
    // Arrange
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'any_email@.com'
      }
    }

    // Assert
    const httpResponse = sut.route(httpRequest)

    // Act
    expect(httpResponse.statusCode).toBe(400)
  })
})
