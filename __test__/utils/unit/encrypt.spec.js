const bcrypt = require('bcrypt')

class Encrypt {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

describe('Encrypt', () => {
  test('Should return true ir bcrypt returns true', async () => {
    // Arrange
    const sut = new Encrypt()

    // Act
    const isValid = await sut.compare('any_password', 'hashed_value')

    // Assert
    expect(isValid).toBe(true)
  })

  test('Should return false ir bcrypt returns false', async () => {
    // Arrange
    const sut = new Encrypt()
    bcrypt.isValid = false

    // Act
    const isValid = await sut.compare('any_password', 'hashed_value')

    // Assert
    expect(isValid).toBe(false)
  })
})
