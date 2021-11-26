const bcrypt = require('bcrypt')

class Encrypt {
  async compare (value, hashValue) {
    const isValid = await bcrypt.compare(value, hashValue)
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

  test('Should call bcrypt with correct values', async () => {
    // Arrange
    const sut = new Encrypt()

    // Act
    await sut.compare('any_password', 'hashed_value')

    // Assert
    expect(bcrypt.value).toBe('any_password')
    expect(bcrypt.hashValue).toBe('hashed_value')
  })
})
