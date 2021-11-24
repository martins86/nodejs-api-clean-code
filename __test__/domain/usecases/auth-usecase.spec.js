const { MissingParamError } = require('../../../src/utils/errors')

class AuthUseCase {
  constructor (loadUserByEmailRepository) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }

    await this.loadUserByEmailRepository.load(email)
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

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    // Arrange
    class LoadUserByEmailRepositorySpy {
      async load (email) {
        this.email = email
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy)

    // Act
    await sut.auth('any_email@email.com', 'any_password')

    // Assert
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })
})
