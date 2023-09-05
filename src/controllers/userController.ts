import { Request, Response } from "express";
import { Error, Mongoose } from "mongoose";
var passport = require("passport");
require("module-alias/register");
var User = require("@models/userSchema");
var authenticate = require("@root/auth");

interface IAuthResponse {
  status?: string;
  success?: boolean;
  token?: string;
}
interface IAuthRequest {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const signup = (
  req: Request<{}, {}, IAuthRequest>,
  res: Response<IAuthResponse>
) => {
  User.register(
    new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }),
    req.body.password,
    (err: Error) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: err.message });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
};

const login = (req: any, res: Response<IAuthResponse>) => {
  const token = authenticate.getToken({ _id: req.user._id });
  return res.json({ token });
};

module.exports = {
  signup,
  login,
};
// End of File
