// // const sessionstore = require("sessionstore");

// var session = require("express-session");
// var FileStore = require("session-file-store")(session);

// var store = new FileStore();

// module.exports = store;

// const sessionstore = require("sessionstore");
const MongoStore = require("connect-mongo");
const mongoose = require("../db/connection/connect");

var store = MongoStore.create({
  //   client: mongoose.connection.getClient(),
  mongoUrl: "mongodb://127.0.0.1:27017/",
  dbName: "loans",
  collectionName: "sessions",
  autoRemove: "interval",
  autoRemoveInterval: 1,
  url: "127.0.0.1:27017/",
});

module.exports = store;
