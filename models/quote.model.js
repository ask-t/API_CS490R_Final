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
    userid: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  }
);

const Quote = mongoose.model("Quote", QuoteSchema);
module.exports = Quote;