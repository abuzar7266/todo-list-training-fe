var express = require("express");
var path = require("path");
var logger = require("morgan");
var session = require("express-session");
var cors = require("cors");
var MongoDbStore = require("connect-mongo");
var dotenv = require("dotenv");
var passport = require("passport");
var DB =  require('./connectDB');
var server = require('./createServer');
var userRouter = require('./routes/userRouter');
var todoRouter = require('./routes/todoRouter');
var app = express();

// Define environment variable
dotenv.config({ path: "./.env" });

DB.connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Define session policy, cookie store and cookie expiration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoDbStore.create({
      mongoUrl: process.env.DB_STRING,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());



app.use(
  cors({
    origin: [process.env.CORS_ORIGIN_URL],
    credentials: true,
  })
);

app.use("/", todoRouter);
app.use("/user", userRouter);

app.use(function (err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Server Creation Section

server.CreateServer(app);
