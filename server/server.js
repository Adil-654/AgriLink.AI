require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')

    app.listen(5000, () => {
      console.log('Server Running On Port 5000')
    })
  })
  .catch((err) => {
    console.log(err)
  })