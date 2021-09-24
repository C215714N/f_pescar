const Post = require("../models/post.js");

exports.create = (req, res) => Post.create( new Post(req.body), (err, data) => 
  err ? res.status(500).send({ message: err.message || "server_error" }) : res.send(data)
)
exports.find = (req, res) => Post.find(req.params.id, (err, data) =>
  err ? ((err.kind === "not_found") ?
  res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: `server_error ${req.params.id}`})) : 
  res.send(data)
)
exports.read = (req, res) => Post.read( (err, data) => 
  err ? res.status(500).send({ message: err.message || "server_error"} ) : res.send(data)
)
exports.update = (req, res) => Post.update( req.params.id, new Post(req.body), (err, data) => 
  err ? ((err.kind === "not_found") ? 
  res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data)  
)
exports.delete = (req, res) => Post.delete(req.params.id, (err, data) => 
  err ? ((err.kind === "not_found") ? res.status(404).send({ message: `${req.params.id} not_found`}) : 
  res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data) 
)
exports.truncate = (req, res) => Post.truncate((err, data) =>
  err ? res.status(500).send({ message:  err.message || "server_error" }) : 
  res.send(data)
)
