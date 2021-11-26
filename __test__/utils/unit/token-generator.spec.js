const jwt = require('jsonwebtoken')

class TokenGenerator {
  async generate (id) {
    return jwt.sign(id, 'secret')
  }
}

const makeSut = () => {
  return new TokenGenerator()
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
})
