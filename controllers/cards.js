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
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      // eslint-disable-next-line eqeqeq
      if (card && (req.user._id == card.owner)) {
        return res.send({ message: 'Карточка удалена', data: card });
      }

      return Promise.reject(new Error('Не ваша карточка'));
    })
    .catch((err) => next(err));
};
