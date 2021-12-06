const MongoConnect = require('../../../../src/utils/connection-mongodb')
const MissingParamError = require('../../../../src/utils/errors/missing-param-error')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamError('userId')
    }

    if (!accessToken) {
      throw new MissingParamError('accessToken')
    }

    await this.userModel.updateOne({
      _id: userId
    },
    {
      $set: {
        accessToken
      }
    })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    userModel,
    sut
  }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoConnect.connect(process.env.MONGO_URL)
    db = MongoConnect.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    await MongoConnect.disconnect()
  })

  test('Should update the user with the given accessToken', async () => {
    // Arrange
    const { sut, userModel } = makeSut()
    const mockUser = {
      _id: 'valid_id',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    await userModel.insertOne(mockUser)

    // Act
    await sut.update(mockUser._id, 'valid_token')
    const updatedUserFake = await userModel.findOne({ _id: mockUser._id })

    // Assert
    expect(updatedUserFake.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    // Arrange
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository()
    const mockUser = {
      _id: 'valid_id',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    await userModel.insertOne(mockUser)

    // Act
    const promise = sut.update(mockUser._id, 'valid_token')

    // Assert
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    // Arrange
    const { sut, userModel } = makeSut()
    const mockUser = {
      _id: 'valid_id',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    await userModel.insertOne(mockUser)

    // Act & Assert
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(mockUser._id)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
