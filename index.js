const express = require("express");
const mongoose = require("mongoose");
const quoteRoute = require("./routes/quote.route.js");
const authRoute = require("./routes/auth.route.js");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/quote", quoteRoute);
app.use("/api/auth", authRoute);




app.get("/", (req, res) => {
  res.send("Hello World!");
});

// mongoose.connect(process.env.MONGO_URI,)
// .then(() => {
//   console.log("Connected to MongoDB...");
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => console.log(`Linstening on port ${port}`));
// })
// .catch(err => console.error("Could not connect to MongoDB...", err));

mongoose
  .connect("mongodb://mongo:27017/quote")
  .then(() => {
    console.log("Connected to MongoDB...");
    port =8080
    app.listen(port, () => console.log(`Linstening on port ${port}`));
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));