/////// (nodemon, dotenv) : devDependencies , npm i nodemon dotenv -D ///////
//1
const express = require("express");

const cors = require("cors");
// 2

const app = express();

//5
require("dotenv").config();

app.use(express.json());

app.use(cors());
// 6

const connectDB = require("./config/connectDB");

//7

connectDB();

//8
const routes = require("./routes/User");

//9
app.use("/api/user", routes);

//3
const port = 5500;

//4
app.listen(port, (err) => {
  err
    ? console.log("erroor", err)
    : console.log(`this server is running on ${port}`);
});
