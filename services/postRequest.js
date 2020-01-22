const axios = require("axios");

function postService(contentType, data, callbackSucess, callbackError) {
  axios
    .post(
      `http://ec2-3-10-190-140.eu-west-2.compute.amazonaws.com:1337/${contentType}`,
      data
    )
    .then(res => {
      console.log(`statusCode: ${res.statusCode}`);
      callbackSucess(res);
    })
    .catch(error => {
      callbackError(error);
    });
}
module.exports = { postService: postService };
