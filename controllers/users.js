const User = require('../models/user');

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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(400).send({ message: 'Bad request' });
    });
};
