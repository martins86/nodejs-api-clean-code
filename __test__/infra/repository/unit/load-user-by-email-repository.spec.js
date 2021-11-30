class LoadUserByEmailRepository {
  async load (email) {
    return null
  }
}

describe('LoadUserByEmailRepository', () => {
  test('Should return null if no user is found', async () => {
    // Arrange
    const sut = new LoadUserByEmailRepository()

    // Act
    const user = await sut.load('invalid_email@mail.com')

    // Assert
    expect(user).toBeNull()
  })
})
