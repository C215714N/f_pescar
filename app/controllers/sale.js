const Sale = require("../models/sale.js");

exports.create = (req, res) => Sale.create( new Sale(req.body), (err, data) => 
  err ? res.status(500).send({ message: err.message || "server_error" }) : res.send(data)
)
exports.find = (req, res) => Sale.find(req.params.id, (err, data) =>
  err ? ((err.kind === "not_found") ?
  res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: `server_error ${req.params.id}`})) : 
  res.send(data)
)
exports.read = (req, res) => Sale.read( (err, data) => 
  err ? res.status(500).send({ message: err.message || "server_error"} ) : res.send(data)
)
exports.update = (req, res) => Sale.update( req.params.id, new Sale(req.body), (err, data) => 
  err ? ((err.kind === "not_found") ? 
  res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data)  
)
exports.delete = (req, res) => Sale.delete(req.params.id, (err, data) => 
  err ? ((err.kind === "not_found") ? res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data) 
)
exports.truncate = (req, res) => Sale.truncate((err, data) =>
  err ? res.status(500).send({ message:  err.message || "server_error" }) : 
  res.send(data)
)
