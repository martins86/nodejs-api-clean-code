const jwt = require('jsonwebtoken')

class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    return jwt.sign(id, this.secret)
  }
}

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
})
