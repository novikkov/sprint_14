const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res
      .status(500)
      .send({ message: 'Ошибка при загрузке карточек' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;

  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(400).send({ message: `Карточки с id: ${req.params.id} не существует` });
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: `Карточки с id: ${req.params.id} не существует` });
      }
    });
};
