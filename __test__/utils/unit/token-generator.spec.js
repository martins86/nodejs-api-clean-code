class TokenGenerator {
  async generate (id) {
    return null
  }
}

describe('Token Generator', () => {
  test('Should return null if JTW returns null', async () => {
    // Arrange
    const sut = new TokenGenerator()

    // Act
    const token = await sut.generate('any_id')

    // Assert
    expect(token).toBeNull()
  })

  test('Should return null if JTW returns null', async () => {
    // Arrange
    const sut = new TokenGenerator()

    // Act
    const token = await sut.generate('any_id')

    // Assert
    expect(token).toBeNull()
  })
})
