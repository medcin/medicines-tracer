const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const pool = require("./public/back-end/db.js");
const { log } = require("console");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");

const cookieParser = require('cookie-parser');

const initializePassport = require("./public/back-end/passport");
initializePassport(
  passport,

  async (email) => {
    const user = await pool.query(
      "SELECT * from public.users WHERE email= $1",
      [email]
    );
    if (user.rowCount !== 0) {
      // console.log(user.rows[0]," 1")
      return user;
    } else {
      // console.log(user.rows,"thissssss")
      return null;
    }
  },

  async (id) => {
    const user = await pool.query("SELECT * from public.users WHERE id= $1", [
      id,
    ]);
    if (user.rowCount !== 0) {
      console.log(user.rows[0])
      return user;
    } else {
      return null;
    }
  }
);

const app = express();

// app uses
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public")); // insteed of sending every file alone this would help u sending one file
app.use(bodyParser()); // this allow u to manage reqs
app.use(router); // router configeration you need it to use router.get but app.get u don't need to do that

app.use(cookieParser());

// get pages
router.get("/", checkNotAuthenticated, (req, res) => {

  res.sendFile(path.join(__dirname, "/public/front-end/html/welcome.html"));

});
//===================
router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/signup.html"));
});
//===================
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/login.html"));
});
//===================
router.get("/main", checkAuthenticated, (req, res) => {

  res.sendFile(path.join(__dirname, "/public/front-end/html/main.html"));

});
//===================
router.get("/my-meds", checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/medsTable.html"));
});
//===================
router.get("/health-news", checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/health-news.html"));
});
//===================
router.get("/settings", checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/settings.html"));
});
//===================
router.get("/otp", checkNotAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/otp.html"));
});
//===================
// the * means any miss spiled rout will lead to 404 page
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/front-end/html/404.html"));
});
//===================


//module.exports = router will make this file avalible outside this folder

// post pages

// Signup
router.post("/otp", async (req, res) => {
  try {
    const { fullName, userName, email, number, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO public.users (name, phone, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fullName, number, email, hashedPassword, userName]
    );
    console.log(newUser)
    res.redirect("/otp");
  } catch {
    res.redirect("/signup");
  }
});

// OTP
router.post("/login", (req, res) => {
  try {
    const { otp } = req.body;
    console.log(req.body);
    /* User registeration info are fetched successfully
    We just need to send it to the database*/

    res.redirect("/login");
  } catch (error) {
    console.error(error.message);
  }
});

// Login

router.post(
  "/main",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// router.post("/main", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { email, password } = req.body;

//     const user = await pool.query(
//       "SELECT * from public.users WHERE email= $1 AND password= $2",
//       [email, password]
//     );

//     console.log(user.rows);
//     if (user.rows.length > 0) {
//       res.redirect("/main");
//     } else {
//       res.send("The email or password is wrong");
//     }
//   } catch (error) {
//     res.send(error.message);
//   }
// });

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/main')
  }
  next()
}

module.exports = checkAuthenticated;

app.listen(5500, async () => {
  console.log("hi");
  // const user = await pool.query(
  //   "SELECT * from public.users WHERE email= $1",
  //   ["faisal@gmail.com"]
  // );
  // console.log(user)
});


