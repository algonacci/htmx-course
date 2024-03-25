const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h2>Welcome to the Node Hypermedia API</h2>");
});

app.post("/message", async (req, res) => {
  res.send("<div><h3>Hello World!</h3></div>");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
