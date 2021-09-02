/* Dependencies */
  const express = require("express");
  const app = express();
/* APP Parameters */
  const PORT = process.env.PORT || 3001;
  const appName = process.env.APP || 'Compumundo Hyper Mega Red'
/* Request config */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.listen(PORT, () => console.log(`Escuchando en el Puerto ${PORT}`))
/* Routes */
  app.get("/", (req, res) => res.json({ message: "Bienvenido a Compumundo Hyper Mega Red." }))
  require("./app/routes/user")(app)
  require("./app/routes/product")(app)
  