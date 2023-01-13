const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLikesCard, removeLikesCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { UrlCheckRegex } = require('../constants/validate');

router.get('/', auth, getCards);
router.delete('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCard);
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(UrlCheckRegex),
  }),
}), createCard);
router.put('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), addLikesCard);
router.delete('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), removeLikesCard);

module.exports = router;
