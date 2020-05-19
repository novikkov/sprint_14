const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Неправильный формат почты',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Неправильный формат почты',
    },
  },
  likes: [{
    type: [mongoose.Schema.ObjectId],
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
