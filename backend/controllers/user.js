// Purpose: Handle user registration and login
//import the generateToken function from the tokens helper
const { generateToken } = require("../helpers/tokens");
//import the validation functions from the validation helper
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
//import the sendVerificationEmail function from the mailer helper
const { sendVerificationEmail } = require("../helpers/mailer");
//import the User model from the User.js file which is the schema for the user in the database
const User = require("../models/User");
//import bcrypt to encrypt the password
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//this function will handle the login request
//it will check if the email and password are correct
//if the email and password are correct, it will generate a token
//asynchroneous because it will take some time to check the database
//what is the benefit of asynchroneous? it will not block the code from running while it is checking the database
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    //check if the email exists in the database
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "This email address already exists",
      });
    }

    if (!validateLength(password, 8, 20)) {
      return res.status(400).json({
        message: "Password must be between 8 and 20 characters",
      });
    }
    //encrypt the password

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tmpusername = first_name + last_name;
    //validate the username
    let newUserName = await validateUsername(tmpusername);
    //create a new user in the database since all the data is valid
    // User is the schema for the user in the database. So creating a new User schema will create a new user in the database
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      username: newUserName,
      gender,
    }).save();
    //.save() is a mongoose function that will save the data in the database

    //generate a token for the user

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`; //this is the url that will be sent to the user's email
    //send the email to the user
    sendVerificationEmail(user.email, user.first_name, url);
    //create a token for the user id
    const token = generateToken({ id: user._id.toString() }, "7d");
    //send the response to the user on the frontend
    //we will send the user id, username, picture, token, and a message
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "Account created successfully. Please check your email to verify your account",
    });
  } catch (error) {
    //if there is an error, send the error message
    res.status(500).json({ message: error.message });
  }
};
//this funxtion will activate the user's account as soon as the user clicks on the link in the email as verification
exports.activateAccount = async (req, res) => {
  try {
    //get the token from the request body from clicking the link in the email
    const { token } = req.body;
    //verify the token
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    //check if the user is already verified
    const check = await User.findById(user.id);
    if (check.verified == true) {
      //if the user is already verified, send a message that already verified
      return res.status(400).json({ message: "Account already verified" });
    } else {
      //if the user is not verified, update the user's verified status to true in the database
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: "Account verified" });
    }
  } catch (error) {
    //if there is an error, send the error message
    res.status(500).json({ message: error.message });
  }
};

//this function will handle the login request
exports.login = async (req, res) => {
  try {
    //get the email and password from the request body from the frontend
    const { email, password } = req.body;
    //check if the email exists in the database
    const user = await User.findOne({ email });
    //if the email does not exist, send a message that the email does not exist
    if (!user) {
      return res
        .status(400)
        .json({ message: "This email address does not exist" });
    }
    //if the email exists, check if the password is correct. We need to incrypt the password and compare it to the password in the database since the password in the database is encrypted
    const checkPassword = await bcrypt.compare(password, user.password);
    //if the password is cincorect, send a message that the password is incorrect
    if (!checkPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    //if the password is correct we create a token for the user id
    const token = generateToken({ id: user._id.toString() }, "7d");
    //send the response to the user on the frontend
    //we will send the user id, username, picture, token, and a message
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login successful",
    });
  } catch (error) {
    //if there is an error, send the error message
    res.status(500).json({ message: error.message });
  }
};
