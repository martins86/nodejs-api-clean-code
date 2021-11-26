const jwt = require('jsonwebtoken')
const MissingParamError = require('../../../src/utils/errors/missing-param-error')
const TokenGenerator = require('../../../src/utils/token-generator')

const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('Token Generator', () => {
  test('Should return null if JTW returns null', async () => {
    // Arrange
    const sut = makeSut()
    jwt.token = null

    // Act
    const token = await sut.generate('any_id')

    // Assert
    expect(token).toBeNull()
  })

  test('Should return a token if JTW returns token', async () => {
    // Arrange
    const sut = makeSut()

    // Act
    const token = await sut.generate('any_id')

    // Assert
    expect(token).toBe(jwt.token)
  })

  test('Should call JWT with correct values', async () => {
    // Arrange
    const sut = makeSut()

    // Act
    await sut.generate('any_id')

    // Assert
    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })

  test('Should throw if no secret is provided', async () => {
    // Arrange
    const sut = new TokenGenerator()

    // Act
    const promise = sut.generate('any_id')

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should throw if no id is provided', async () => {
    // Arrange
    const sut = makeSut()

    // Act
    const promise = sut.generate()

    // Assert
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
