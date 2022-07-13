// // const sessionstore = require("sessionstore");

var session = require("express-session");
var FileStore = require("session-file-store")(session);

var store = new FileStore();

module.exports = store;

// const sessionstore = require("sessionstore");

// var store = sessionstore.createSessionStore({
//   type: "mongodb",
//   dbName: "loans",
//   collectionName: "sessions",
//   timeout: 10000,
//   url: "127.0.0.1:27017/",
// });

// module.exports = store;
