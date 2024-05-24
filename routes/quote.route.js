const express = require("express");
const router = express.Router();
const { getQuotes, getQuote, createQuote, updateQuote, deleteQuote, test } = require("../controllers/quote.controller.js");

router.get("/", getQuotes);
router.get("/:id", getQuote);
router.post("/", createQuote);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);
router.get("/test/test", test);

module.exports = router;
