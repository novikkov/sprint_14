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

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const { owner } = card;
      return owner;
    })
    .then((owner) => {
      const ownerStr = JSON.stringify(owner).slice(1, -1);

      if (req.user._id !== ownerStr) {
        return Promise.reject(new Error('Не ваша карточка'));
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then((user) => res.send({ data: user }))
        .catch((err) => res.status(500).send({ message: err.message }));
    })
    .catch((err) => next(err));
};
