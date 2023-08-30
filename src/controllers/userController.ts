
import {Request, Response} from 'express';
var passport = require("passport");
require('module-alias/register');
var User = require("@models/userSchema");
var authenticate = require("@root/auth");

interface authResponse{
    status?: string,
    success?: boolean,
    token?:string
}
interface authRequest{
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email?: string
}
const signup = (req: Request<{}, {}, authRequest>, res: Response<authResponse>) => {
    User.register(
        new User({
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        }),
        req.body.password,
        (err: any, user: any) => {
          if (err.status ?? 0) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ status: err });
          } else {
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({ success: true, status: "Registration Successful!" });
            });
          }
        }
      );
}



const login = (req: any, res: Response<authResponse>) => {
  const token = authenticate.getToken({ _id: req.user._id });
  return res.json({ token });
}
module.exports = {
  signup,
  login
};

// End of File
