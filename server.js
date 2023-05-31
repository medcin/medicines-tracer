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
    // console.log(req.body);
    /* User registeration info are fetched successfully
  We just need to send it to the database*/
    const { fullName, userName, email, number, password } = req.body;
    // console.log(fullName, userName, email, number, password);
    const newUser = await pool.query(
      "INSERT INTO public.users (name, phone, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fullName, number, email, password, userName]
    );
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

router.post("/main", async (req, res) => {
  try {
    console.log(req.body);

    /* User login info are fetched successfully
    We just need to verify it*/
    const { email, password } = req.body;
    // console.log("SELECT * from public.users WHERE email= $1 , password= $2 ", [
    //   email,
    //   password,
    // ]);

    const user = await pool.query(
      "SELECT * from public.users WHERE email= $1 AND password= $2",
      [email, password]
    );

    console.log(user.rows);
    if (user.rows.length > 0) {
      res.sendFile(path.join(__dirname, "/public/front-end/html/main.html"));
    } else {
      res.send("The email or password is wrong");
    }
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(5500, () => {
  console.log("hi");
});
