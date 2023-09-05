var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // used to create, sign, and verify token
require("module-alias/register");
const userControllers = require("@controllers/userController");
const userSchema = require("@models/userSchema");

interface IOptsFormat {
  jwtFromRequest: string;
  secretOrKey: string;
}

var opts: IOptsFormat = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ahsdjhasdhagsjdgajsdgjhagsdjhgasdhgajhsgdjhagsdhgasd",
};

exports.getToken = function (user: any) {
  return jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: 3600 });
};

passport.use(new LocalStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async function fetchCredential(
    jwt_payload: any,
    done: any
  ) {
    await userSchema
      .findOne({ _id: jwt_payload._id })
      .then((res: any) => {
        if (res) return done(null, res);
        else return done(null, false);
      })
      .catch((err: any) => {
        return done(err, false);
      });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
// End of File
