/** *Express setup** */
const express = require("express");

const app = express();

/** *Middleware Dependencies** */
const morgan = require("morgan"); // logger middleware

/** *Other Dependencies** */
const apiRouter = require("./resources/api.router");
app.use(
  "/api/", // add additional middleware to the server, mounted on the /api/ path
  express.json(), // enables parsing of application/json request bodies
  express.urlencoded({ extended: true }), // enables parsing of application/x-www-form-urlencoded data
  apiRouter
);

if (process.env.NODE_ENV !== "test") {
  // run morgan middelware's development mode; detailed, colored dev log
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
}

module.exports = app;
