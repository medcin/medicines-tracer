const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./public/back-end/routes/routing.js");
const pool = require("./public/back-end/db.js");
const { log } = require("console");

const app = express();

// app uses
app.use(express.static("public")); // insteed of sending every file alone this would help u sending one file
app.use(bodyParser()); // this allow u to manage reqs
app.use("/", router); // router configeration you need it to use router.get but app.get u don't need to do that

// get pages

// post pages


router.post("/otp", async (req, res) => {
try {
  console.log(req.body);
  /* User registeration info are fetched successfully
  We just need to send it to the database*/
  const {fullName, userName, email, number, password} = req.body;
  console.log(fullName, userName, email, number, password);
  const newUser = await pool.query("INSERT INTO public.users (name, phone, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *", [fullName, number, email, password, userName])
  res.sendFile(path.join(__dirname, "/public/front-end/html/otp.html"));
} catch (error) {
    console.error(error.message);
}
});

router.post("/login", (req, res) => {
  try {
    const { otp } = req.body;
    console.log(req.body);
    /* User registeration info are fetched successfully
    We just need to send it to the database*/
    
    res.sendFile(path.join(__dirname, "/public/front-end/html/login.html"));
  } catch (error) {
      console.error(error.message);
  }
  });

router.post("/home", (req, res) => {
  console.log(req.body);
  /* User login info are fetched successfully
  We just need to verify it*/
  const {} = req.body;
  res.sendFile(path.join(__dirname, "/public/front-end/html/home.html"));
});

app.listen(5500, () => {
  console.log("hi");
});
