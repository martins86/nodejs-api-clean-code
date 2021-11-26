const Encrypt = require('../../../src/utils/encrypt')
const bcrypt = require('bcrypt')

const makeSut = () => {
  return new Encrypt()
}

describe('Encrypt', () => {
  test('Should return true ir bcrypt returns true', async () => {
    // Arrange
    const sut = makeSut()

    // Act
    const isValid = await sut.compare('any_password', 'hashed_value')

    // Assert
    expect(isValid).toBe(true)
  })

  test('Should return false ir bcrypt returns false', async () => {
    // Arrange
    const sut = makeSut()
    bcrypt.isValid = false

    // Act
    const isValid = await sut.compare('any_password', 'hashed_value')

    // Assert
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    // Arrange
    const sut = makeSut()

    // Act
    await sut.compare('any_password', 'hashed_value')

    // Assert
    expect(bcrypt.value).toBe('any_password')
    expect(bcrypt.hashValue).toBe('hashed_value')
  })
})
