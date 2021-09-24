module.exports = app => {
  const sale = require("../controllers/sale")
  app.post  ( "/sales",     sale.create   )
  app.get   ( "/sales",     sale.read     )
  app.get   ( "/sales/:id", sale.find     )
  app.put   ( "/sales/:id", sale.update   )
  app.delete( "/sales/:id", sale.delete   )
  app.delete( "/sales",     sale.truncate )
}
