const Content = require('../models/Content')
const contentController = {}

contentController.index = (req, res, next) => {
  Content.findAll()
    .then(content => {
      res.json({
        message: 'ok',
        data: { content }
      })
    }).catch(next)
}

contentController.show = (req, res, next) => {
  Content.findById(req.params.id)
    .then(content => {
      res.json({
        message: 'ok',
        data: { content }
      })
    }).catch(next)
}

contentController.create = (req, res, next) => {
  Content.create({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.url
  }, req.user.id).then(content => {
    res.json({
      message: 'Post added successfully!',
      data: { content }
    })
  }).catch(next)
}

contentController.update = (req, res, next) => {
  Content.update({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.url
  }, req.params.id).then(movie => {
    res.json({
      message: 'Post updated successfully!',
      data: { movie }
    })
  }).catch(next)
}

contentController.delete = (req, res, next) => {
  Content.destroy(req.params.id)
    .then(() => {
      res.json({
        message: 'Post deleted successfully!'
      })
    }).catch(next)
}

module.exports = contentController
