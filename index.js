const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(process.env.MONGO_URI,)
.then(() => {
  console.log("Connected to MongoDB...");
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Linstening on port ${port}`));
})
.catch(err => console.error("Could not connect to MongoDB...", err));

