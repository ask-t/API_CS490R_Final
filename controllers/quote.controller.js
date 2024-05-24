const Quote = require('../models/quote.model');

const test = async (req, res) => {
  res.send("Hello World");
}

const getQuotes = async (req, res) => {
  try {
    const info = await Quote.find({});
    res.status(200).json(info);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuote = async (req, res) => {
  try{
    const { id } = req.params;
    const info = await Quote.findById(id);
    res.status(200).json(info);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const createQuote = async (req, res) => {
  try {
    const info = await Quote.create(req.body);
    res.status(200).json(info);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await Quote.findByIdAndUpdate(id, req.body);
    if(!info) {
      return res.status(404).json({ message: "Quote not found" });
    }
    const updatedInfo = await Quote.findById(id);
    res.status(200).json(updatedInfo);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const info = await Quote.findByIdAndDelete(id);
    if(!info) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json({ message: "Quote deleted successfully" });
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  test,
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote
};