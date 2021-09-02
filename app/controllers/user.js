const User = require("../models/user.js");
/* Database Controllers */
  exports.create = (req, res) => User.create( new User(req.body), (err, data) => 
    err ? res.status(500).send({ message: err.message || "server_error" }) : res.send(data)
  )
  exports.find = (req, res) => User.find(req.params.id, (err, data) =>
    err ? ((err.kind === "not_found") ?
    res.status(404).send({ message: `${req.params.id} not_found`}) : 
    res.status(500).send({ message: `server_error ${req.params.id}`})) : 
    res.send(data)
  )
  exports.read = (req, res) => User.read( (err, data) => 
    err ? res.status(500).send({ message: err.message || "server_error"} ) : res.send(data)
  )
  exports.update = (req, res) => User.update( req.params.id, new User(req.body), (err, data) => 
    err ? ((err.kind === "not_found") ? 
    res.status(404).send({ message: `${req.params.id} not_found`}) : 
    res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data)  
  )
  exports.delete = (req, res) => User.delete(req.params.id, (err, data) => 
    err ? ((err.kind === "not_found") ? res.status(404).send({ message: `${req.params.id} not_found`}) : 
    res.status(500).send({ message: err.message || `server_error ${req.params.id}`})) : res.send(data) 
  )
  exports.truncate = (req, res) => User.truncate((err, data) =>
    err ? res.status(500).send({ message:  err.message || "server_error" }) : 
    res.send(data)
  )
