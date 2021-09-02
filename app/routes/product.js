module.exports = app => {
  const product = require("../controllers/product")
  app.post  ( "/products",     product.create   )
  app.get   ( "/products",     product.read     )
  app.get   ( "/products/:id", product.find     )
  app.put   ( "/products/:id", product.update   )
  app.delete( "/products/:id", product.delete   )
  app.delete( "/products",     product.truncate )
}
