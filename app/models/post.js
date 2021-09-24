const sql = require("../config/db.js")
/* Constructor Model */
  const Post = function(post) {
    this.user = post.user
    this.product = post.product
    this.price = post.price
    this.quantity = post.quantity
  }
/*Database Queries*/
  Post.create = (newPost, result) => 
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => 
    err ? result(err, null) : result(null, { id: res.insertId, ...newPost } ) )

  Post.find = (id, result) => 
    sql.query(`SELECT * FROM posts WHERE post_id = ${id}`, (err, res) => 
    err ? result(err, null) : (res.length) ? result(null, res[0]) : result({ kind: "not_found" }, null) )
  
  Post.read = result => 
    sql.query(
      `SELECT 
        post_id,
        u.user_name AS usuario,
        p.product AS producto,
        quantity AS cantidad,
        price AS precio,
        DATE_FORMAT(post_date,'%d-%m-%y') AS 'publicado',
        is_used AS usado,
        delivery AS envios
      FROM posts AS ps
      JOIN users AS u ON u.user_id = ps.user
      JOIN products AS p ON p.product_id = ps.product
      ORDER BY post_date, user_name`, (err, res) => 
    err ? result(null, err) : result(null, res) )
  
  Post.update = (id, post, result) =>
    sql.query( `UPDATE posts SET ? WHERE post_id = ${id}`, post, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }, null) : result(null, { id: id, ...post } ) )
  
  Post.delete = (id, result) =>
    sql.query(`DELETE FROM posts WHERE post_id = ${id}`, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }) : result(null, res) )
  
  Post.truncate = result => 
    sql.query("TRUNCATE posts", (err, res) =>
    err ? result(null, err) : result(null, res) )

module.exports = Post