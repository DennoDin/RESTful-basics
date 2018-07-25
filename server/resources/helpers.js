// Reminder that all of this is just suggestion, feel free to do things your way!
const fs = require("fs").promises;

const QUOTES = "./server/data/quotes.txt";
const TYPE = "utf8";

let cache = null;

const read = async (author) => {
  if (!cache) {
    cache = await fs.readFile(QUOTES, TYPE);
  }
  const obj = {
    quotes: [],
  };
  const splitted = cache.toString().split("\n");
  for (let i = 0; i < splitted.length; i++) {
    const splitLine = splitted[i].split(" ~");
    const objects = {
      text: splitLine[0],
      author: splitLine[1],
    };
    obj.quotes.push(objects);
  }
  if (author === "random") {
    const number = Math.floor(Math.random() * obj.quotes.length);
    const randomQuote = obj.quotes[number];
    return randomQuote;
  }
  if (author) {
    return obj.quotes.filter((element) => {
      return element.author === author;
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

const append = async (text, author) => {
  if (!author) {
    author = "Anonymous";
  }
  const output = `\n${text} ~${author}`;
  await fs.appendFile("./server/data/quotes.txt", output, "utf8");
  cache = await fs.readFile(QUOTES, TYPE);
};

const update = async (object = "") => {
  if (!object) {
    await fs.writeFile("./server/data/quotes.txt", object, "utf8");
    cache = await fs.readFile(QUOTES, TYPE);
    return;
  }
  const newQuotesArr = [];
  for (let i = 0; i < object.length; i++) {
    let author;
    if (!object[i].author) {
      author = "Anonymous";
    } else {
      author = object[i].author;
    }
    newQuotesArr.push(`${object[i].text} ~${author}`);
  }
  const input = newQuotesArr.join("\n");
  await fs.writeFile("./server/data/quotes.txt", input, "utf8");
  cache = await fs.readFile(QUOTES, TYPE);
};

module.exports = { read, send, append, update };
