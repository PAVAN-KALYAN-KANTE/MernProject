const express = require("express");
var loanroute = express.Router();
const bodyParser = require("body-parser");

loanroute.use(bodyParser.json());

const Actions = require("../db/Actions");
const sessionChecker = require("../utils/middleware/sessionChecker");

loanroute.post("/login", (req, res) => {
  console.log("req.header", req.headers);
  console.log(req.body);
  let userObj = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  Actions.loginUser(userObj, req, res);
});

loanroute.post("/test", (req, res) => {
  console.log("req.header", req.headers);
  res.json({
    content: req.body,
    sessionFromBackend: req.session,
  });
});

loanroute.get("/newLoan", sessionChecker, (req, res) => {
  var loanObject = {
    email: req.param("email"),
    sessionId: req.param("sessionId"),
  };
  loanOperations.newLoan(loanObject, req, res);
});

loanroute.post("/reqNewLoan", sessionChecker, (req, res) => {
  console.log("req.body inside /reqNewLoan", req.body);

  console.log("reqNewLoanObject received..", req.body);
  loanOperations.reqNewLoan(req.body, req, res);
});

loanroute.get("/getLoans", sessionChecker, (req, res) => {
  loanOperations.getLoans(req, res);
});

loanroute.post("/rejectLoan", sessionChecker, (req, res) => {
  console.log("got req.body for approve loan", req.body);
  loanOperations.rejectLoan(req.body, req, res);
});

loanroute.post("/approveLoan", sessionChecker, (req, res) => {
  console.log("got req.body for approve loan", req.body);
  loanOperations.approveLoan(req.body, req, res);
});

module.exports = loanroute;
