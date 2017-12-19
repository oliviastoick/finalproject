const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()
require('dotenv').config()

app.use(cookieParser())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  session({
    key: process.env.SECRET_KEY,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// sends this message when rooth path is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

const authRoutes = require('./routes/auth-routes')
app.use('/api/auth', authRoutes)

// error handlers
const contentRoutes = require('./routes/content-routes');
app.use('/api/content', contentRoutes);


app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Not Found!'
  })
})


app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    error: err,
    message: err.message
  })
})

module.exports = app
