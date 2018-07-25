// Reminder that all of this is just suggestion, feel free to do things your way!
const fs = require("fs");

const QUOTES = "./server/data/quotes.txt";
const TYPE = "utf8";

const cache = null;

const read = (req) => {
  const text = fs.readFileSync(QUOTES, TYPE);
  const obj = {
    quotes: [],
  };
  const splitted = text.toString().split("\n");
  for (let i = 0; i < splitted.length; i++) {
    const splitLine = splitted[i].split(" ~");
    const objects = {
      text: splitLine[0],
      author: splitLine[1],
    };
    obj.quotes.push(objects);
  }
  if (req === "random") {
    const number = Math.floor(Math.random() * obj.quotes.length);
    const randomQuote = obj.quotes[number];
    return randomQuote;
  }
  if (req) {
    return obj.quotes.filter((element) => {
      return element.author === req;
    });
  }
  return obj;
};

const send = (res, code, data, json = true) => {
  // send a response
  if (json) {
    res.status(code).json(data);
  } else {
    res.status(code).send(data);
  }
};

// const record = (quote, author) {

// }

module.exports = { read, send };
