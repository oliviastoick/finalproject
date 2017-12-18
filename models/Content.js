const db = require('../db/config')
const Content = {}

Content.findAll = () => {
  return db.query('SELECT * FROM content')
}

Content.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM content
    WHERE id = $1
  `, [id])
}

Content.create = (content, userId) => {
  return db.one(`
    INSERT INTO content
    (title, description, url, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [content.title, content.description, content.url, userId])
}

Content.update = (content, id) => {
  return db.one(`
    UPDATE content SET
    title = $1,
    description = $2,
    url = $3
    WHERE id = $4
    RETURNING *
  `, [content.title, content.description, content.url, id])
}

Content.destroy = (id) => {
  return db.none(`
    DELETE FROM content
    WHERE id = $1
  `, [id])
}

module.exports = Content
