const express = require("express");
const router = express.Router();
const { Register, Login } = require("../controllers/userControllers");
const isAuth = require("../middlewares/isAuth");
// test routes
router.get("/test", (req, res) => {
  res.status(200).json("test is success");
});
//register
router.post("/register", Register);
// login
router.post("/login", Login);
router.get("/current", isAuth, (req, res) => {
  res.status(200).send({ msg: "you are authorizd", user: req.user });
});
module.exports = router;
