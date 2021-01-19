const LoginRouter = require('./login-router')
const MissingParamError = require('./../helpers/missing-param-error')

const makeSut = () => {
  return new LoginRouter()
}
describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    // Arrange
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    // Assert
    const httpResponse = sut.route(httpRequest)

    // Act
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', () => {
    // Arrange
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@.com'
      }
    }

    // Assert
    const httpResponse = sut.route(httpRequest)

    // Act
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 500 if no httpRequest is provided', () => {
    // Arrange
    const sut = makeSut()

    // Assert
    const httpResponse = sut.route()

    // Act
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if no httpRequest has no body', () => {
    // Arrange
    const sut = makeSut()
    const httpRequest = {}

    // Assert
    const httpResponse = sut.route(httpRequest)

    // Act
    expect(httpResponse.statusCode).toBe(500)
  })
})
