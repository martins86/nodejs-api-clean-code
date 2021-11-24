const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError, InvalidParamError } = require('../../../src/utils/errors')

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)

  return {
    sut,
    loadUserByEmailRepositorySpy
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email is provided', async () => {
    // Arrange
    const { sut } = makeSut()

    // Act
    const promise = sut.auth()

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    // Arrange
    const { sut } = makeSut()

    // Act
    const promise = sut.auth('any_email@email.com')

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy } = makeSut()

    // Act
    await sut.auth('any_email@email.com', 'any_password')

    // Assert
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository si provided', async () => {
    // Arrange
    const sut = new AuthUseCase()

    // Act
    const promise = sut.auth('any_email@email.com', 'any_password')

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    // Arrange
    const sut = new AuthUseCase({})

    // Act
    const promise = sut.auth('any_email@email.com', 'any_password')

    // Assert
    expect(promise).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    // Arrange
    const { sut } = makeSut()

    // Act
    const accessToken = await sut.auth('invalid_email@email.com', 'any_password')

    // Assert
    expect(accessToken).toBeNull()
  })
})
