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
  addQuote(req, res) {
    if (req.body.text === "") {
      send(res, FAIL);
      return;
    }
    const quotesObj = read();
    const quotesArr = quotesObj.quotes;
    const newQuotesArr = [];
    for (let i = 0; i < quotesArr.length; i++) {
      const quoteWithAuthor = `${quotesArr[i].text} ~${quotesArr[i].author}`;
      newQuotesArr.push(quoteWithAuthor);
    }
    let author;
    if (!req.body.author) {
      author = "Anonymous";
    } else {
      author = req.body.author;
    }
    const newQuoteWithAuthor = `${req.body.text} ~${author}`;
    newQuotesArr.push(newQuoteWithAuthor);
    const output = newQuotesArr.join("\n");
    fs.writeFileSync("./server/data/quotes.txt", output, "utf8");

    send(res, OK);
  },
};
