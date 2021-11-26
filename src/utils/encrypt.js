const bcrypt = require('bcrypt')
const MissingParamError = require('../../src/utils/errors/missing-param-error')

module.exports = class Encrypt {
  async compare (value, hashValue) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hashValue) {
      throw new MissingParamError('hash')
    }
    const isValid = await bcrypt.compare(value, hashValue)
    return isValid
  }
}
