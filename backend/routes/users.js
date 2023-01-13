const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, editUserInfo, editUserAvatar, getMeInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { UrlCheckRegex } = require('../constants/validate');

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(UrlCheckRegex),
  }),
}), editUserAvatar);
router.get('/me', auth, getMeInfo);
router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserInfo);
router.get('/', auth, getUsers);
router.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUser);

module.exports = router;
