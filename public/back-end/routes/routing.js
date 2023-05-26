const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/welcome.html"));
  res.render(path.join(__dirname, "/../../../../layout/layout.hbs"));
});
//===================
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/signup.html"));
});
//===================
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/login.html"));
});
//===================
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/home.html"));
  res.render(path.join(__dirname, "/layout/test.hbs"));
});
//===================
router.get("/my-meds", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/mymeds.html"));
});
//===================
router.get("/health-news", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/health-news.html"));
});
//===================
router.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/settings.html"));
});
//===================
// the * means any miss spiled rout will lead to 404 page
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../front-end/html/404.html"));
});
//===================

module.exports = router; // will make this file avalible outside this folder
