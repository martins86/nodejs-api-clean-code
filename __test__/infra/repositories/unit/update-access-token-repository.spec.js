const MongoConnect = require('../../../../src/utils/connection-mongodb')
const UpdateAccessTokenRepository = require('../../../../src/infra/repositories/update-access-token-repository')
const MissingParamError = require('../../../../src/utils/errors/missing-param-error')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('UpdateAccessToken Repository', () => {
  let mockUserId

  beforeAll(async () => {
    await MongoConnect.connect(process.env.MONGO_URL)
    db = MongoConnect.db
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany({})
    const mockUser = {
      _id: 'valid_id',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    await userModel.insertOne(mockUser)
    mockUserId = mockUser._id
  })

  afterAll(async () => {
    await MongoConnect.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    // Arrange
    const { sut, userModel } = makeSut()

    // Act
    await sut.update(mockUserId, 'valid_token')
    const updatedUserFake = await userModel.findOne({ _id: mockUserId })

    // Assert
    expect(updatedUserFake.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    // Arrange
    const sut = new UpdateAccessTokenRepository()

    // Act
    const promise = sut.update(mockUserId, 'valid_token')

    // Assert
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    // Arrange
    const { sut } = makeSut()

    // Act & Assert
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(mockUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
