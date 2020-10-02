const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  try {
    mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/karya", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    winston.info("Connected to MongoDb");
  } catch (ex) {
    winston.error(ex);
  }
};
