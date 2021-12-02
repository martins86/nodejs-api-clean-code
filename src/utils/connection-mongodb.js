const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.connection.db(dbName)
  },

  async disconnect () {
    await this.connection.close()
  }
}
