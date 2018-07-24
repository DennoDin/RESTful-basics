// Reminder that all of this is just suggestion, feel free to do things your way!
const fs = require("fs");

const QUOTES = "./server/data/quotes.txt";
const TYPE = "utf8";

const cache = null;

const read = () => {
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

module.exports = { read, send };
