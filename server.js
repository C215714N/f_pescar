/* Dependencies */
  const cors = require("cors")
  const express = require("express");
  const app = express();

/* APP Parameters */
  const PORT = process.env.PORT || 3001;
  const appName = process.env.APP || 'Compumundo Hyper Mega Red'
/* Request config */
  app.use(express.json());
  app.use(cors({origin: '*'}));
  app.use(express.urlencoded({ extended: true }));
  app.listen(PORT, () => console.log(`Escuchando en el Puerto ${PORT}`))
/* Routes */
  app.get("/", (req, res) => res.json({ message: `Bienvenido a ${appName}.` }))
  require("./app/routes/user")(app)
  require("./app/routes/product")(app)
  require("./app/routes/post")(app)
  require("./app/routes/sale")(app)
  