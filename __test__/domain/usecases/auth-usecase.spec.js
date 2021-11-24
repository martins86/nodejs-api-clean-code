const { AuthUseCase } = require('../../../src/domain/usecases')
const { MissingParamError } = require('../../../src/utils/errors')

const makeSut = () => {
  class EncryptSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
    }
  }
  const encryptSpy = new EncryptSpy()
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    password: 'hashed_password'
  }
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encryptSpy)

  return {
    sut,
    loadUserByEmailRepositorySpy,
    encryptSpy
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
    expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    // Arrange
    const sut = new AuthUseCase({})

    // Act
    const promise = sut.auth('any_email@email.com', 'any_password')

    // Assert
    expect(promise).rejects.toThrow()
  })

  test('Should return null if an invalid email is provided', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null

    // Act
    const accessToken = await sut.auth('invalid_email@email.com', 'any_password')

    // Assert
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    // Arrange
    const { sut } = makeSut()

    // Act
    const accessToken = await sut.auth('valid_email@email.com', 'invalid_password')

    // Assert
    expect(accessToken).toBeNull()
  })

  test('should call Encrypt with correct values', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy, encryptSpy } = makeSut()

    // Act
    await sut.auth('valid_email@email.com', 'any_password')

    // Assert
    expect(encryptSpy.password).toBe('any_password')
    expect(encryptSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })
})
