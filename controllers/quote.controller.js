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
    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

        const quoteUserId = quote.userid?.toString();
        const reqUserId = req.user?.userid?.toString();

    // Check if the logged-in user is the owner of the quote or an admin
    if (quoteUserId !== reqUserId && !req.user.isAdmin()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this quote" });
    }

    // If authorized, proceed with update
    await Quote.findByIdAndUpdate(id, req.body, { new: true }); // `new: true` to return the updated document
    const updatedQuote = await Quote.findById(id);
    res.status(200).json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findById(id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // Safely calling toString() with optional chaining and a fallback to prevent crashes
    const quoteUserId = quote.userid?.toString();
    const reqUserId = req.user?.userid?.toString();
    console.log(quoteUserId, reqUserId);

    // Check if the logged-in user is the owner of the quote or an admin
    if (quoteUserId !== reqUserId && !req.user.isAdmin()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this quote" });
    }

    // If authorized, proceed with deletion
    await Quote.findByIdAndDelete(id);
    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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