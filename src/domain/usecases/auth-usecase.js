const { MissingParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, encryptSpy) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encryptSpy = encryptSpy
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }

    const user = await this.loadUserByEmailRepository.load(email)

    if (!user) {
      return null
    }
    await this.encryptSpy.compare(password, user.password)

    return null
  }
}
