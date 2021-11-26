const bcrypt = require('bcrypt')

module.exports = class Encrypt {
  async compare (value, hashValue) {
    const isValid = await bcrypt.compare(value, hashValue)
    return isValid
  }
}
