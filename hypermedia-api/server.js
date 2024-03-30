const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("<h2>Welcome to the Node Hypermedia API</h2>");
  }, 3000);
});

app.post("/message", async (req, res) => {
  res.send("<div><h3>Hello World!</h3></div>");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  res.send(`<div><b>Email: </b>${email}, <b>Password: </b>${password}</div>`);
});

app.post("/post", (req, res) => {
  const request = req.body;
  console.log(request);
  res.send(request);
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  console.log(filePath);
  res.send(`<b>Upload Succesful: </b> ${filePath}`);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on http://127.0.0.1:${PORT}`);
});
