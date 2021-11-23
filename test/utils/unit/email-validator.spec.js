class EmailValidator {
  isValid (email) {
    return true
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
})
