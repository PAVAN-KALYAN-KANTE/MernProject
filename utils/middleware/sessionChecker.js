const store = require("../sessionstore");
var sessionChecker = (request, response, next) => {
  console.log(request.body);
  console.log("req.body.sessionId inside middleware", request.body.sessionId);
  if (request.method === "POST") {
    console.log("inside if");
    store.get(request.body.sessionId, (err, session) => {
      if (err) {
        console.log("err");
        response.json({
          isAuth: false,
        });
      } else if (!session) {
        console.log("session if");
        response.json({
          isAuth: false,
        });
      } else {
        next();
      }
    });
  } else {
    store.get(request.body.sessionId, (err, session) => {
      if (err) {
        console.log("err");
        response.json({
          isAuth: false,
        });
      } else if (!session) {
        response.json({
          isAuth: false,
        });
      } else {
        console.log(
          "sessionId inside the sessionChecker is",
          request.body.sessionId
        );
        next();
      }
    });
  }
};

module.exports = sessionChecker;
