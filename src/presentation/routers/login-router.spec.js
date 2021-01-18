class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.body.email) {
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
})
