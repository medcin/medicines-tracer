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
e_app.use(bodyParser()); // this allow u to manage reqs
e_app.use("/", router); // router configeration you need it to use router.get but app.get u don't need to do that

// get pages
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/welcome.html"));
});
//===================
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/signup.html"));
});
//===================
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/login.html"));
});
//===================
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/home.html"));
});
//===================
router.get("/my-meds", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/mymeds.html"));
});
//===================
router.get("/health-news", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/health-news.html"));
});
//===================
router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "public/front-end/settings.html"));
});
//===================
// the * means any miss spiled rout will lead to 404 page
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/404.html"));
});
//===================

// post pages

router.post("/user", (req, res) => {
  console.log(req.body);
  res.json({ msg: "I'm here" });
});
