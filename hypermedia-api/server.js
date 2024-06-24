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

app.post("/oob", async (req, res) => {
  res.send(`
    <div>
      <h3 id="target2" hx-swap-oob="true">Hello World!</h3>
      This goes to the main target
    </div>
    `);
});

app.post("/oob_swap", async (req, res) => {
  res.send(`
    <div>
      <h3 id="target2">Hello World!</h3>
      This goes to the main target
    </div>
    `);
});

app.get("/big_box", (req, res) => {
  const size = req.query.size;

  // Determine the size of the box based on the query parameter
  let boxSize, newSize;
  if (size === "big") {
    boxSize = "300px";
    color = "blue";
    newSize = "small";
  } else {
    boxSize = "100px";
    color = "red";
    newSize = "big";
  }

  // Send the HTML response
  res.send(`
    <div id="growing-box" class="grow" style="height: ${boxSize}; width: ${boxSize}; background-color: ${color};"
         hx-get="http://127.0.0.1:8000/big_box?size=${newSize}" hx-swap="outerHTML" hx-trigger="click">
        ${size === "big" ? "Big Box" : "Small Box"}
    </div>
  `);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App running on http://127.0.0.1:${PORT}`);
});
