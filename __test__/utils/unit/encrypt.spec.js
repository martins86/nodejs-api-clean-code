
class Encrypt {
  async compare (value, hash) {
    return true
  }
}

describe('Encrypt', () => {
  test('Should return true ir bcrypt returns true', async () => {
    // Arrange
    const sut = new Encrypt()

    // Act
    const isValid = await sut.compare('any_password', 'hashed_password')

    // Assert
    expect(isValid).toBe(true)
  })

  test('Should return true ir bcrypt returns true', async () => {
    // Arrange
    const sut = new Encrypt()

    // Act
    const isValid = await sut.compare('any_password', 'hashed_password')

    // Assert
    expect(isValid).toBe(true)
  })
})
