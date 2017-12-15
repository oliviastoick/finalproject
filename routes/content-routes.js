const express = require('express')
const contentRoutes = express.Router()
const contentController = require('../controllers/content-controller')

contentRoutes.get('/', contentController.index)
contentRoutes.post('/', contentController.create)
contentRoutes.get('/:id', contentController.show)
contentRoutes.put('/:id', contentController.update)
contentRoutes.delete('/:id', contentController.delete)

module.exports = contentRoutes
