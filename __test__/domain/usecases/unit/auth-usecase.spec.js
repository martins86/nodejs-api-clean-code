const { AuthUseCase } = require('../../../../src/domain/usecases')
const { MissingParamError } = require('../../../../src/utils/errors')

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'any_token'
  return tokenGeneratorSpy
}

const makeTokenGeneratorWithError = () => {
  class TokenGeneratorSpy {
    async generate () {
      throw new Error()
    }
  }
  return new TokenGeneratorSpy()
}

const makeEncrypt = () => {
  class EncryptSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }
  const encryptSpy = new EncryptSpy()
  encryptSpy.isValid = true
  return encryptSpy
}

const makeEncryptWithError = () => {
  class EncryptSpy {
    async compare () {
      throw new Error()
    }
  }
  return new EncryptSpy()
}

const makeLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    id: 'any_id',
    password: 'hashed_password'
  }
  return loadUserByEmailRepositorySpy
}

const makeLoadUserByEmailRepositoryWithError = () => {
  class LoadUserByEmailRepositorySpy {
    async load () {
      throw new Error()
    }
  }
  return new LoadUserByEmailRepositorySpy()
}

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepository {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepository()
}

const makeUpdateAccessTokenRepositoryWithError = () => {
  class UpdateAccessTokenRepository {
    async update () {
      throw new Error()
    }
  }
  return new UpdateAccessTokenRepository()
}

const makeSut = () => {
  const encryptSpy = makeEncrypt()
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const tokenGeneratorSpy = makeTokenGenerator()

  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy,
    encrypt: encryptSpy,
    tokenGenerator: tokenGeneratorSpy
  })

  return {
    sut,
    loadUserByEmailRepositorySpy,
    updateAccessTokenRepositorySpy,
    encryptSpy,
    tokenGeneratorSpy
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
    const promise = sut.auth('any_email@mail.com')

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy } = makeSut()

    // Act
    await sut.auth('any_email@mail.com', 'any_password')

    // Assert
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com')
  })

  test('Should return null if an invalid email is provided', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.user = null

    // Act
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')

    // Assert
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    // Arrange
    const { sut, encryptSpy } = makeSut()
    encryptSpy.isValid = false

    // Act
    const accessToken = await sut.auth('valid_email@mail.com', 'invalid_password')

    // Assert
    expect(accessToken).toBeNull()
  })

  test('should call Encrypt with correct values', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy, encryptSpy } = makeSut()

    // Act
    await sut.auth('valid_email@mail.com', 'any_password')

    // Assert
    expect(encryptSpy.password).toBe('any_password')
    expect(encryptSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('should call TokenGenerator with correct userId', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy } = makeSut()

    // Act
    await sut.auth('valid_email@mail.com', 'valid_password')

    // Assert
    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })

  test('should return an accessToken if correct credentials are provided', async () => {
    // Arrange
    const { sut, tokenGeneratorSpy } = makeSut()

    // Act
    const accessToken = await sut.auth('valid_email@mail.com', 'valid_password')

    // Assert
    expect(accessToken).toBeTruthy()
    expect(accessToken).toBe(tokenGeneratorSpy.accessToken)
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    // Arrange
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy, updateAccessTokenRepositorySpy } = makeSut()

    // Act
    await sut.auth('valid_email@mail.com', 'valid_password')

    // Assert
    expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(tokenGeneratorSpy.accessToken)
  })

  test('Should throw if invalid dependencies are provided', async () => {
    // Arrange
    const invalid = {}
    const loadUserByEmailRepository = makeLoadUserByEmailRepository()
    const encrypt = makeEncrypt()
    const tokenGenerator = makeTokenGenerator()
    const suts = [].concat(
      new AuthUseCase(),
      new AuthUseCase({}),
      new AuthUseCase({
        loadUserByEmailRepository: invalid
      }),
      new AuthUseCase({
        loadUserByEmailRepository
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt: invalid
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt,
        tokenGenerator: invalid
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt,
        tokenGenerator
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt,
        tokenGenerator,
        updateAccessTokenRepository: invalid
      })
    )

    // Act && Assert
    for (const sut of suts) {
      const promise = sut.auth('any_email@mail.com', 'any_password')
      expect(promise).rejects.toThrow()
    }
  })

  test('Should throw if any dependency throws', async () => {
    // Arrange
    const loadUserByEmailRepository = makeLoadUserByEmailRepository()
    const encrypt = makeEncrypt()
    const tokenGenerator = makeTokenGenerator()
    const suts = [].concat(
      new AuthUseCase({
        loadUserByEmailRepository: makeLoadUserByEmailRepositoryWithError()
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt: makeEncryptWithError()
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt,
        tokenGenerator: makeTokenGeneratorWithError()
      }),
      new AuthUseCase({
        loadUserByEmailRepository,
        encrypt,
        tokenGenerator,
        updateAccessTokenRepository: makeUpdateAccessTokenRepositoryWithError()
      })
    )

    // Act && Assert
    for (const sut of suts) {
      const promise = sut.auth('any_email@mail.com', 'any_password')
      expect(promise).rejects.toThrow()
    }
  })
})
