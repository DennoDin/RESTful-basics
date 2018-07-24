const router = require("express").Router();
const controller = require("./api.controller.js");

router.get("/", controller.hello);
router.get("/quotes", controller.quote);
router.get("/quotes?author=''", controller.quoteAuthor);
// router.route('/quotes')
// .get(/*insert controller method here*/)
// .post(/*insert controller method here*/)
// .put(/*insert controller method here*/);

module.exports = router;
