const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // The cost factor for hashing

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    default: "unknown",
  },
  quoteList: {
    type: [String],
    default: [],
  },
  favoriteList: {
    type: [String],
    default: [],
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Hashing the password before saving it to the database
UserSchema.pre("save", function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Generate a salt and use it to hash the password
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    // Replace the plaintext password with the hashed one
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
