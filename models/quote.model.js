const mongoose = require("mongoose");

const QuoteSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please enter a quote"],
    },
    category: {
      type: String,
      required: true,
      default: "general",
    },
    author: {
      type: String,
      required: true,
      default: "unknown",
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
  }
);

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;