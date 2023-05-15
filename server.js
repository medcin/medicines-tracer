const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const e_app = express();
const router = express.Router();
e_app.listen(5500, () => {
  console.log("hi");
});

// app uses
e_app.use(express.static("public")); // insteed of sending every file alone this would help u sending one file
e_app.use(bodyParser()); // this allow u to mange reqs
e_app.use("/", router); // router configeration you need it to use router.get but app.get u don't need to do that

// get pages
router.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/index.html"));
});
//===================
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/home.html"));
});
//===================
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/404.html"));
});
//===================

// post pages

router.post("/user", (req, res) => {
  console.log(req.body);
  res.json({ msg: "I'm here" });
});
