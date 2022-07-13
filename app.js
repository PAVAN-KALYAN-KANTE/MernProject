const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("./db/connection/connect");
var loanroute = require("./Routes/loanroutes");
var KnexSessionStore = require("connect-session-knex");

const store = require("./utils/sessionstore");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log("inside the cors middleware");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(
  session({
    store: store,
    secret: "bat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 5,
    },
  })
);

app.use("/", loanroute);

app.listen(8000, function () {
  console.log("server started");
});
