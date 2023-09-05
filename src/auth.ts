var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // used to create, sign, and verify token
require("module-alias/register");
const userControllers = require("@controllers/userController");
const userSchema = require("@models/userSchema");

passport.use(new LocalStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

const getToken = function (user: any) {
  return jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: 3600 });
};

const jwtPassport = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "ahsdjhasdhagsjdgajsdgjhagsdjhgasdhgajhsgdjhagsdhgasd",
    },
    async function fetchCredential(jwt_payload: any, done: any) {
      await userSchema
        .findOne({ _id: jwt_payload._id })
        .then((res: any) => {
          if (res) return done(null, { _id: res._id });
          else return done(null, false);
        })
        .catch((err: any) => {
          return done(err, false);
        });
    }
  )
);

const verifyUser = passport.authenticate("jwt", { session: false });

module.exports = {
  getToken,
  jwtPassport,
  verifyUser,
};
// End of File
