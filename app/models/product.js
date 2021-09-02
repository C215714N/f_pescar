const sql = require("../config/db.js")
/* Constructor Model */
  const Product = function(product) {
    this.product = product.product
    this.category = product.category
  }
/*Database Queries*/
  Product.create = (newProduct, result) => 
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => 
    err ? result(err, null) : result(null, { id: res.insertId, ...newProduct } ) )

  Product.find = (id, result) => 
    sql.query(`SELECT * FROM products WHERE product_id = ${id} OR product = ${id}`, (err, res) => 
    err ? result(err, null) : (res.length) ? result(null, res[0]) : result({ kind: "not_found" }, null) )
  
  Product.read = result => 
    sql.query("SELECT * FROM products", (err, res) => 
    err ? result(null, err) : result(null, res) )
  
  Product.update = (id, product, result) =>
    sql.query( `UPDATE products SET ? WHERE product_id = ${id}`, product, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }, null) : result(null, { id: id, ...product } ) )
  
  Product.delete = (id, result) =>
    sql.query(`DELETE FROM products WHERE product_id = ${id} OR product = ${id}`, (err, res) =>
    err ? result(null, err) : (res.affectedRows == 0) ? result({ kind: "not_found" }) : result(null, res) )
  
  Product.truncate = result => 
    sql.query("TRUNCATE products", (err, res) =>
    err ? result(null, err) : result(null, res) )

module.exports = Product