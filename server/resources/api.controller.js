const { read, send } = require("./helpers");
const fs = require("fs");

const OK = 200;
const FAIL = 400;
const SERVER_ERROR = 500;

/** *Controllers** */

module.exports = {
  hello(req, res) {
    send(
      res,
      OK,
      "You have reached the Quotes API. I hope you enjoy your stay!",
      false
    );
  },
  quote(req, res) {
    const author = req.query.author;
    send(res, OK, read(author));
  },
  quoteRandom(req, res) {
    send(res, OK, read("random"));
  },
};
