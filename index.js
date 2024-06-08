const express = require("express");
const mongoose = require("mongoose");
const quoteRoute = require("./routes/quote.route.js");
const authRoute = require("./routes/auth.route.js");
const postRoute = require("./routes/posts.route.js");
const passport = require("passport");
require("dotenv").config();
require("./config/passport")(passport);

mongoose
  .connect("mongodb://mongo:27017/quote")
  .then(() => {
    const app = express();
    console.log("Connected to MongoDB...");
    const port = 8080; // Defined within the scope

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize()); // Initialize passport middleware

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.use("/api/quote", quoteRoute);
    app.use("/api/auth", authRoute);
    app.use(
      "/api",
      passport.authenticate("jwt", { session: false }),
      postRoute
    ); // Changed "JWT" to "jwt"

    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
