const sql = require("../config/db.js")
/* Constructor Model */
  const User = function(user) {
    this.user_email = user.user_email
    this.user_name = user.user_name
    this.user_password = user.user_password
  }
/*Database Queries*/
  User.create = (newUser, result) => 
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => 
    err ? result(err, null) : result(null, { id: res.insertId, ...newUser } ) )

  User.find = (id, result) => 
    sql.query(`SELECT * FROM users WHERE user_id = ${id} OR user_email = ${id}`, (err, res) => 
    err ? result(err, null) : (res.length) ? result(null, res[0]) : result({ kind: "not_found" }, null) )
  
  User.read = result => 
    sql.query(
      `SELECT 
        user_id,
        user_name AS usuario,
        CONCAT(last_name, ' ', first_name) AS 'nombre completo',
        phone AS telefono,
        user_email AS correo,
        cuit
      FROM users AS u
      JOIN users_data AS ud ON ud.user = u.user_id`, (err, res) => 
    err ? result(null, err) : result(null, res) )
  
  User.update = (id, user, result) =>
    sql.query( `UPDATE users SET ? WHERE user_id = ${id}`, user, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }, null) : result(null, { id: id, ...user } ) )
  
  User.delete = (id, result) =>
    sql.query(`DELETE FROM users WHERE user_id = ${id} OR user_name = ${id}`, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }) : result(null, res) )
  
  User.truncate = result => 
    sql.query("TRUNCATE users", (err, res) =>
    err ? result(null, err) : result(null, res) )

module.exports = User