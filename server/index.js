const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 3000
const db = process.env.DATABASE
const taskRoutes = require('./routes/taskRoutes')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api/v1',taskRoutes)

mongoose.connect(db).then(() => {
  console.log('connected to database')
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})