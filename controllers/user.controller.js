const User = require("../models/user.model.js");

const createUser = async (req, res) => {
  try {
    // Create a new user with the request body
    const newUser = new User(req.body);
    // Save the new user to the database
    await newUser.save();
    // Send a response without the password field
    const userResponse = {
      name: newUser.name,
      userid: newUser.userid,
      email: newUser.email,
      quoteList: newUser.quoteList,
      favoriteList: newUser.favoriteList,
      role: newUser.role,
      created: newUser.created,
    };
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});
    // Send a response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    // Retrieve the user with the specified id from the database
    const { id } = req.params;
    const user
    = await User.findById(id);
    // Send a response
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const checkUser = async (req, res) => {
  try {
    // Retrieve the user with the specified userid from the database
    const { userid } = req.params;
    const user = await User.findOne({ userid });
    // Send a response
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    // Retrieve the user with the specified id from the database
    const { id } = req.params;
    const user = await User.findById(id);
    // Update the user's information
    user.set(req.body);
    // Save the updated user to the database
    await user.save();
    // Send a response
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    // Retrieve the user with the specified id from the database
    const { id } = req.params;
    const user = await User.findById(id);
    // Delete the user from the database
    await user.remove();
    // Send a response
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
}

