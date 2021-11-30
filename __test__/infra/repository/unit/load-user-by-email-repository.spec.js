const { MongoClient } = require('mongodb')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

describe('LoadUserByEmailRepository', () => {
  let connection, db

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    await connection.close()
  })

  test('Should return null if no user is found', async () => {
    // Arrange
    const userModel = db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)

    // Act
    const user = await sut.load('invalid_email@mail.com')

    // Assert
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    // Arrange
    const mockUser = { email: 'valid_email@mail.com' }
    const userModel = db.collection('users')
    await userModel.insertOne(mockUser)
    const sut = new LoadUserByEmailRepository(userModel)

    // Act
    const user = await sut.load('valid_email@mail.com')

    // Assert
    expect(user.email).toBe(mockUser.email)
  })
})