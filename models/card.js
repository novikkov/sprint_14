const mongoose = require('mongoose');

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
    match: /^http[s]?:\/\/(www\.)?(?!(www\.))((\d{1,3}\.){3}\d{1,3}(:\d{2,5})?|([a-z-]+(\.|:\d{2,5}))+)(\/?)(([a-zA-Z0-9-]{1,}?\/?)*#?)?$/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    match: /^http[s]?:\/\/(www\.)?(?!(www\.))((\d{1,3}\.){3}\d{1,3}(:\d{2,5})?|([a-z-]+(\.|:\d{2,5}))+)(\/?)(([a-zA-Z0-9-]{1,}?\/?)*#?)?$/,
  },
  likes: {
    type: [mongoose.Schema.ObjectId],
    default: [],
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
