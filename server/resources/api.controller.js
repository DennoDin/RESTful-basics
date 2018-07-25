const { read, send, append } = require("./helpers");
const fs = require("fs").promises;

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
  async quote(req, res) {
    const author = req.query.author;
    send(res, OK, await read(author));
  },
  async quoteRandom(req, res) {
    send(res, OK, await read("random"));
  },
  async postQuote(req, res) {
    if (req.body.text === "") {
      send(res, FAIL);
      return;
    }
    const text = req.body.text;
    const author = req.body.author;
    await append(text, author);
    send(res, OK);
  },
  async editQuotes(req, res) {
    if (!req.body[0].text) {
      send(res, FAIL);
      return;
    }
    send(res, OK);
  },
};
