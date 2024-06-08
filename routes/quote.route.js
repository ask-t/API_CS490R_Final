const express = require("express");
const router = express.Router();
const { getQuotes, getQuote, createQuote, updateQuote, deleteQuote, test } = require("../controllers/quote.controller.js");
const passport = require("passport");

router.get("/", getQuotes);
router.get("/:id", getQuote);
router.post("/", passport.authenticate("jwt", { session: false }), createQuote);
router.put("/:id", passport.authenticate('jwt', { session: false }),updateQuote);
router.delete("/:id",passport.authenticate('jwt', { session: false }), deleteQuote);
router.get("/test/test", test);

module.exports = router;
