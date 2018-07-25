const router = require("express").Router();
const controller = require("./api.controller.js");

router.get("/", controller.hello);
router.get("/quotes", controller.quote);
router.get("/quotes/random", controller.quoteRandom);
// router.route('/quotes')
// .get(/*insert controller method here*/)
router.post("/quotes", controller.addQuote);
// .put(/*insert controller method here*/);

module.exports = router;
