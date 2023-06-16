const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const session = require("express-session");

async function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user == null) {
      const errorMessage = "Failed to authenticate user. Please try again.";
       alert(errorMessage);
      return done(null, false, { message: "Login information are incorrect!" });
    }

    try {
      if (await bcrypt.compare(password, user.rows[0].password)) {
        return done(null, user);
      } else {
        const errorMessage = "Incorrect password. Please try again.";
        alert(errorMessage);
        return done(null, false, {
          message: "Login information are incorrect!",
        });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.rows[0].email);

  });
  passport.deserializeUser(async (email, done) => {
    const user = await getUserByEmail(email);
    return done(null, user);
  });
}

module.exports = initialize;
