const express = require("express");
const cors = require("cors");

const products = require("./products");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//request gets from frontend, response is what is given back
app.get("/", (req, res) => {
  res.send("Welcome to our online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

//if 5000 not available, a port number will be assigned
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
