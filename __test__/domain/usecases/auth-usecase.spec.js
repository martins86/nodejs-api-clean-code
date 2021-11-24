const { MissingParamError } = require('../../../src/utils/errors')

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new MissingParamError('email')
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
})
