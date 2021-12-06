const MongoConnect = require('../../../../src/utils/connection-mongodb')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
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
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository(userModel)
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
})
