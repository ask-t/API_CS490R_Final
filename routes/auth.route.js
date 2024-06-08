const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const router = express.Router();
const config = require("../config/config.js");

router.post("/signup", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  } else {
    const newUser = new User({
      name: req.body.name,
      userid: req.body.userid,
      email: req.body.email,
      password: req.body.password,
    });

    newUser
      .save()
      .then((user) => {
        // Send response without the password information
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(201).json({
          success: true,
          message: "User created successfully",
          user: userWithoutPassword,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          // Check for duplicate key error
          return res
            .status(400)
            .json({
              success: false,
              message: "The email address already exists.",
            });
        }
        res
          .status(500)
          .json({
            success: false,
            message: "Error creating user",
            error: err.message,
          });
      });
  }
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
  .then((user) =>{
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Error comparing password.",
              error: err.message,
            });
        }
        if (isMatch) {
          const tokenObj = {
            _id: user._id,
            email: user.email,
            role: user.role,
          };
          const token = jwt.sign(tokenObj, config.secret);
          res.json({ success: true, token: "JWT " + token });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Authentication failed." });
        }
      });
    }
  })
  .catch(err =>{
    return res.status(500).json({
      success: false,
      message: "Error finding the user.",
      error: err.message,
    });
  })
});

module.exports = router;
