module.exports = app => {
  const post = require("../controllers/post")
  app.post  ( "/posts",     post.create   )
  app.get   ( "/posts",     post.read     )
  app.get   ( "/posts/:id", post.find     )
  app.put   ( "/posts/:id", post.update   )
  app.delete( "/posts/:id", post.delete   )
  app.delete( "/posts",     post.truncate )
}
