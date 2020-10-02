const express = require("express");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

const route = express.Router();

route.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Exists");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();

  const result = await user.save();
  if (result) res.header("x-auth-token", token).send(result);
});

module.exports = route;
