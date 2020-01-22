const http = require("http");
//req.user

const findAll = function(contentType, query, callbackSucess, callbackError) {
  getService(contentType, query, callbackSucess, callbackError);
};

function getService(contentType, query, callbackSucess, callbackError) {
  http
    .get(
      `http://ec2-3-10-190-140.eu-west-2.compute.amazonaws.com:1337/${contentType}`,
      resp => {
        let first = true;
        let data = "";
        resp.on("data", chunk => {
          data += chunk;
        });
        resp.on("end", () => {
          if (first) {
            callbackSucess(JSON.parse(data));
            first = false;
            console.log(JSON.parse(data));
          }
        });
      }
    )
    .on("error", err => {
      callbackError(err.message);
    });
}
module.exports = { findAll: findAll };
