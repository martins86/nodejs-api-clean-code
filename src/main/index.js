const mongoConnect = require('./../utils/connection-mongodb')
const env = require('./config/env')

mongoConnect.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')

    app.listen(5858, () => console.log('Server Running!!!'))
  })
  .catch(console.error)
