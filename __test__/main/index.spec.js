describe('Index', () => {
  test('Should call app listen', () => {
    // Arrange
    jest.mock('./../../src/main/config/app', () => ({
      listen (port, callback) {
        if (callback) {
          callback()
        }
      }
    }))

    // Act
    const mock = jest.requireMock('./../../src/main/config/app')
    const listen = jest.spyOn(mock, 'listen')
    require('./../../src/main/index')

    // Assert
    expect(listen).toHaveBeenCalledTimes(1)
  })
})
