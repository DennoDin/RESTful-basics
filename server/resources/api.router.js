const router = require("express").Router();
const controller = require("./api.controller.js");

router.get("/", controller.hello);
router.get("/quotes", controller.quote);
router.get("/quotes/random", controller.quoteRandom);
router.post("/quotes", controller.postQuote);
router.put("/quotes", controller.editQuotes);
// router.route('/quotes')

module.exports = router;
