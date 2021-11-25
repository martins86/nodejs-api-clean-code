const EmailValidator = require('./../../../src/utils/email-validator')
const validator = require('validator')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator return true', () => {
    // Arrange
    const sut = makeSut()
    const isEmailValid = sut.isValid('any_valid')

    // Act & Assert
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    // Arrange
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('any_invalid')

    // Act & Assert
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', () => {
    // Arrange
    const sut = makeSut()

    // Act
    sut.isValid('any_valid')

    // Assert
    expect(validator.email).toBe('any_valid')
  })
})
