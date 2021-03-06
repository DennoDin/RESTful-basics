const { read, send, append, update } = require("./helpers");

const OK = 200;
const FAIL = 400;

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
    if (req.body.length === 0) {
      await update();
      send(res, OK, await read());
      return;
    }
    if (!req.body[0].text) {
      send(res, FAIL);
      return;
    }
    const object = req.body;
    await update(object);
    send(res, OK, await read());
  },
};
