const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const router = express.Router();
const config = require("../config/config.js");

router.get("/all", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    })
});


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
      role: req.body.role,
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
          return res.status(400).json({
            success: false,
            message: "The email address already exists.",
          });
        }
        res.status(500).json({
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

router.put(
  "/update-account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Old and new passwords are required.",
        });
    }

    const user = req.user; // req.user is populated by passport

    // Verify old password
    user.comparePassword(req.body.oldPassword, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error checking password." });
      }
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Old password is incorrect." });
      }

      // Update to new password
      user.password = req.body.newPassword; // Assign new password
      user
        .save() // Save the updated user
        .then(() =>
          res.json({ success: true, message: "Password updated successfully." })
        )
        .catch((err) =>
          res
            .status(500)
            .json({
              success: false,
              message: "Failed to update password.",
              error: err.message,
            })
        );
    });
  }
);

router.delete(
  "/delete-account/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndDelete(req.user._id)
      .then(() => {
        res.json({ success: true, message: "Account deleted successfully." });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Failed to delete account.",
          error: err.message,
        });
      });
  }
);

router.delete("/deleteAll", (req, res) => {
  User.deleteMany()
    .then(() => {
      res.json({ message: "All users deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});


module.exports = router;
