// bcrypt
// jwt jsonwebtoken
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
// register
exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    //{email:email} = {email}
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );
    res.status(200).send({ msg: "user created successfully", newUser, token });
  } catch (err) {
    res.status(500).send(err);
  }
};
//login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).send("Bad credentials");
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res.status(400).send("Bad credentials");
    }
    const token = jwt.sign(
      { id: findUser._id, name: findUser.name },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );
    res.status(200).send({
      msg: "user logged in successfully",
      findUser,
      token,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
