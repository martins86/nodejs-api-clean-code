const MongoConnect = require('../../../../src/utils/connection-mongodb')
const LoadUserByEmailRepository = require('./../../../../src/infra/repository/load-user-by-email-repository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('LoadUserByEmailRepository', () => {
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

  test('Should return null if no user is found', async () => {
    // Arrange
    const { sut } = makeSut()

    // Act
    const user = await sut.load('invalid_email@mail.com')

    // Assert
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    // Arrange
    const { sut, userModel } = makeSut()
    const mockUser = {
      _id: 'valid_id',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    }
    await userModel.insertOne(mockUser)

    // Act
    const user = await sut.load('valid_email@mail.com')

    // Assert
    expect(user).toEqual({
      email: mockUser.email,
      password: mockUser.password
    })
  })

  test('Should throw if no userModel is provided', async () => {
    // Arrange
    const sut = new LoadUserByEmailRepository()

    // Act
    const promise = sut.load('any_email@mail.com')

    // Assert
    expect(promise).rejects.toThrow()
  })
})
