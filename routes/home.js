const express = require("express");

const route = express.Router();

route.get("", (req, res) => {
  res.send("Welcome to Karya App");
});

module.exports = route;
