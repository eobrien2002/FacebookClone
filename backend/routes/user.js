const express = require("express");
//importing the register function from the user controller
const { register, activateAccount, login } = require("../controllers/user");

//creating a router
//a router is a middleware that will handle the requests
const router = express.Router();

//creating a post request to the register endpoint
router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);

//exporting the router
//this will allow us to use the router in other files
module.exports = router;
