const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'key-key-key', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res
      .status(500)
      .send({ message: 'Ошибка при загрузке пользователей' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: `Пользователя с данным id: ${req.params.id} не существует` });
      }
    })
    .catch(() => {
      res.status(400).send({ message: `Пользователя с данным id: ${req.params.id} не существует` });
    });
};


module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (password.length > 6) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
      .then((user) => User.findById({ _id: user._id }))
      .then((user) => res.send({ data: user }))
      .catch(() => {
        res.status(400).send({ message: 'Данный email уже зарегистрирован' });
      });
  }
};
