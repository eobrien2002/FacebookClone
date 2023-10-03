//importing the User model
//the User model is a schema that we created in the User.js file
const User = require("../models/User");

//this function will validate the email
exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

//this function will validate the length of the text
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

//this function will validate the username
exports.validateUsername = async (username) => {
  let a = false;

  do {
    //check if the username exists in the database
    //await because the findOne function is asynchronous
    //asynchronous because it will take some time to check the database
    let check = await User.findOne({ username });
    if (check) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
