// const { MongoClient, ServerApiVersion } = require("mongodb");

// const url =
//   "mongodb+srv://batman:Batman@718@cluster0.8socvbh.mongodb.net/loanapp?retryWrites=true&w=majority";

// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,

//   serverApi: ServerApiVersion.v1,
// });
// module.exports = client.connect();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/loans", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
