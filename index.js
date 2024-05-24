const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productRoute);



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

