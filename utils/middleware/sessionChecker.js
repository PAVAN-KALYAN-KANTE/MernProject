const store = require("../sessionstore");
var sessionChecker = (request, response, next) => {
  console.log("req.body.sessionId inside middleware", request.body.sessionId);
  if (request.method == "POST") {
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
        next();
      }
    });
  } else {
    store.get(request.param("sessionId"), (err, session) => {
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
          request.param("sessionId")
        );
        next();
      }
    });
  }
};

module.exports = sessionChecker;
