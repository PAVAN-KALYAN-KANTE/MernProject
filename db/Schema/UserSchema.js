const mongoose = require("../connection/connect");

// const mongoose = require("mongoose");

// mongoose2
// .then(() => {
//   console.log("Sucess");
// })
// .catch(() => {
//   console.log("failed");
// });
const schema = mongoose.Schema;
var UserSchema = new schema({
  email: String,
  password: String,
  role: String,
  vallet: { type: Number, default: 0 },
  loans: [
    {
      loanid: String,
      amount: Number,
      status: String,
      description: String,
    },
  ],
});

var userModel = mongoose.model("UserModel", UserSchema);
module.exports = userModel;
