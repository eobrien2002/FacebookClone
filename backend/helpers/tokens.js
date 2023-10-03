// Purpose: Helper function to generate token for user authentication
const jwt = require("jsonwebtoken");

//payload is the data we want to store in the token
//expired is the time the token will expire
exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};

//The purpose of jwt is to send data securely that identifies the user between the client and server.
