const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); //specifies which http requests can access the server

//routes middleware
const { readdirSync } = require("fs");

//readdirSync will read all the files in the routes folder and map them to the app.use
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewURLParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongoDB", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is listening from ${PORT}`);
});
