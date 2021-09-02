const Product = require("../models/product.js");

exports.create = (req, res) => Product.create( new Product(req.body), (err, data) => 
  err ? res.status(500).send({ message: err.message || "server_error" }) : res.send(data)
)
exports.find = (req, res) => Product.find(req.params.id, (err, data) =>
  err ? ((err.kind === "not_found") ?
  res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: `server_error ${req.params.id}`})) : 
  res.send(data)
)
exports.read = (req, res) => Product.read( (err, data) => 
  err ? res.status(500).send({ message: err.message || "server_error"} ) : res.send(data)
)
exports.update = (req, res) => Product.update( req.params.id, new Product(req.body), (err, data) => 
  err ? ((err.kind === "not_found") ? 
  res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data)  
)
exports.delete = (req, res) => Product.delete(req.params.id, (err, data) => 
  err ? ((err.kind === "not_found") ? res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data) 
)
exports.truncate = (req, res) => Product.truncate((err, data) =>
  err ? res.status(500).send({ message:  err.message || "server_error" }) : 
  res.send(data)
)
