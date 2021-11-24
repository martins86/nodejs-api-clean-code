const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should return true if validator return true', () => {
    // Arrange
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@email.com')

    // Act & Assert
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator return false', () => {
    // Arrange
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('invalid_email')

    // Act & Assert
    expect(isEmailValid).toBe(false)
  })
})
