const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send({ msg: "you are not authorized1" });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // decoded => payload({id, name, expiration du token , iat})
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send("you are not authorized2");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("you are not authorized3");
  }
};

module.exports = isAuth;
