const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./public/back-end/routes/routing.js");

const app = express();

// app uses
app.use(express.static("public")); // insteed of sending every file alone this would help u sending one file
app.use(bodyParser()); // this allow u to manage reqs
app.use("/", router); // router configeration you need it to use router.get but app.get u don't need to do that

// get pages

// post pages


router.post("/login", (req, res) => {
  console.log(req.body);
  /* User registeration info are fetched successfully
  We just need to send it to the database*/
  const {} = req.body;
  res.sendFile(path.join(__dirname, "/public/front-end/html/login.html"));
});

router.post("/home", (req, res) => {
  console.log(req.body);
  /* User login info are fetched successfully
  We just need to verify it*/
  const {} = req.body;
  res.sendFile(path.join(__dirname, "/public/front-end/html/home.html"));

  /*
router.post("/user", (req, res) => {
  console.log(req.body);
  /* insted of doing it like
  const x = req.body.x
  x is the attrubite name
  such as adress or somthing //*
  const {} = req.body;
  res.json({ msg: "I'm here" });
  */

});

app.listen(5500, () => {
  console.log("hi");
});