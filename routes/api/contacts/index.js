const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavorite
} = require('./validation');

router.get('/', guard, ctrl.getAll);

router.get('/:contactId', guard, ctrl.getById);

router.post('/', guard, validateCreateContact, ctrl.create);

router.delete('/:contactId', guard, ctrl.remove);

router.put('/:contactId', guard, validateUpdateContact, ctrl.update);

router.patch(
  '/:contactId/favorite',
  guard,
  validateUpdateFavorite,
  ctrl.update
);

module.exports = router;
