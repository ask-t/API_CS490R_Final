const mongoose = require("mongoose");

const RankSchema = mongoose.Schema({
  rank: {
    type: Number,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const Rank = mongoose.model("Rank", RankSchema);
module.exports = Rank;
