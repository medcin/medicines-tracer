const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const session = require("express-session");

async function initialize(passport, getUserByEmail, getUserById) {

    const authenticateUser = async (email, password, done) => {
        // console.log(password)
        const user = await getUserByEmail(email)
        if (user == null) {
            console.log('yarb ashof altext ha4a')
            return done(null, false, { message: "Login information are incorrect!"} )
        }

        try {
            
            if(await bcrypt.compare(password, user.rows[0].password)) {
                console.log("success")
                return done(null, user)
            } else {
                console.log("failed")
                return done(null, false, {message: "Login information are incorrect!"})
            }
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new LocalStrategy( { usernameField: "email" }, authenticateUser ))

    passport.serializeUser((user, done) => {
        done(null, user.rows[0].id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id)
        return done(null, user)
    })
}

module.exports = initialize