const Rank = require("../models/rank.model.js");

const getRanks = async (req, res) => {
  try {
    const ranks = await Rank.find({});
    res.status(200).json(ranks);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const getRank = async (req, res) => {
  try {
    const { id } = req.params;
    const rank = await Rank.findById(id);
    res.status(200).json(rank);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const createRank = async (req, res) => {
  try {
    const rank = await Rank.create(req.body);
    res.status(200).json(rank);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteAll = async (req, res) => {
  try {
    await Rank.deleteMany({});
    res.status(200).json({ message: "All ranks deleted successfully" });
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}