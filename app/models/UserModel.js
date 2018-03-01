const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'User',
  new Schema({
    userId: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
  })
);
