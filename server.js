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
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const initializePassport = require("./public/back-end/passport");
initializePassport(
  passport,

  async (email) => {
    const user = await pool.query(
      "SELECT * from public.users WHERE email= $1",
      [email]
    );
    if (user.rowCount !== 0) {
      return user;
    } else {
      return null;
    }
  },

  async (id) => {
    const user = await pool.query("SELECT * from public.users WHERE id= $1", [
      id,
    ]);
    if (user.rowCount !== 0) {
      return user;
    } else {
      return null;
    }
  }
);

const app = express();

//------------------------------------------------------------------------------------------
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
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser());
app.use(router);
app.use(cookieParser());

//------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------
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
    res.redirect("/otp");
  } catch {
    res.redirect("/signup");
  }
});

//------------------------------------------------------------------------------------------
// OTP
router.post("/login", (req, res) => {
  try {
    const { otp } = req.body;
    res.redirect("/login");
  } catch (error) {
    console.error(error.message);
  }
});

//------------------------------------------------------------------------------------------
// Login
router.post(
  "/main",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//------------------------------------------------------------------------------------------
// Log out
router.delete("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

//------------------------------------------------------------------------------------------
// Functions
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/main");
  }
  next();
}
//------------------------------------------------------------------------------------------
let server = 3000;
app.listen(server, async () => {
  console.log("hi from server " + server);
});