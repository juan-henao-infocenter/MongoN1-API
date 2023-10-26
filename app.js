const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env["PORT"] || 5000;
const schema = require("./graphQL/schema");
const {validateToken} = require("./middlewares/auth");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const db = require("./db");

app.use(express.static("public"));
app.use(express.json());

app.use(cors());

db.connect();

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(
  "/graphql", validateToken,
  graphqlHTTP({
     schema: schema,
     graphiql: true,
  })
 );

app.listen(port, () => {
  console.log(`Servidor API escuchando en el puerto ${port}`);
});
