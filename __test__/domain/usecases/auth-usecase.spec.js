const { MissingParamError } = require('../../../src/utils/errors')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    // Arrange
    const sut = new AuthUseCase()

    // Act
    const promise = sut.auth()

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    // Arrange
    const sut = new AuthUseCase()

    // Act
    const promise = sut.auth('any_email@email.com')

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
