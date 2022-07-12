const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

const url =
  "mongodb+srv://batman:Batman@718@mymern.f4pjnwv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((error) => {
  if (!error) {
    console.log("sucess");
  } else console.log(error);
});

app.listen(8000, function () {
  console.log("server started");
});
