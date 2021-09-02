module.exports = app => {
  const user = require("../controllers/user")
  app.post  ( "/users",     user.create   )
  app.get   ( "/users",     user.read     )
  app.get   ( "/users/:id", user.find     )
  app.put   ( "/users/:id", user.update   )
  app.delete( "/users/:id", user.delete   )
  app.delete( "/users",     user.truncate )
}
