const sql = require("../config/db.js")
/* Constructor Model */
  const Sale = function(sale) {
    this.sale_email = sale.sale_email;
    this.sale_name = sale.sale_name;
    this.sale_password = sale.sale_password;
  }
/*Database Queries*/
  Sale.create = (newSale, result) => 
    sql.query("INSERT INTO sales SET ?", newSale, (err, res) => 
    err ? result(err, null) : result(null, { id: res.insertId, ...newSale } ) )

  Sale.find = (id, result) => 
    sql.query(`SELECT * FROM sales WHERE sale_id = ${id} OR sale_email = ${id}`, (err, res) => 
    err ? result(err, null) : (res.length) ? result(null, res[0]) : result({ kind: "not_found" }, null) )
  
  Sale.read = result => 
    sql.query(`
    SELECT
      sale_id,
      u.user_name AS usuario,
      p.post_title AS publicacion,
      s.quantity AS comprado,
      s.price AS Precio,
      DATE_FORMAT(sell_date,'%d-%m-%y') AS comprado,
      state AS estado
    FROM sales AS s
    JOIN users AS u ON u.user_id = s.user
    JOIN posts AS p ON p.post_id = s.post;`, (err, res) => 
    err ? result(null, err) : result(null, res) )
  
  Sale.update = (id, sale, result) =>
    sql.query( `UPDATE sales SET ? WHERE sale_id = ${id}`, sale, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }, null) : result(null, { id: id, ...sale } ) )
  
  Sale.delete = (id, result) =>
    sql.query(`DELETE FROM sales WHERE sale_id = ${id} OR sale_name = ${id}`, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }) : result(null, res) )
  
  Sale.truncate = result => 
    sql.query("TRUNCATE sales", (err, res) =>
    err ? result(null, err) : result(null, res) )

module.exports = Sale