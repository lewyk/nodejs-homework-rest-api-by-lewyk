const express = require('express');
const router = express.Router();
const contacts = require('../../model/index');

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateFavorite
} = require('./validation');

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const data = await contacts.getContactById(id);
    if (data === 'invalidID') {
      res.status(404).json({ message: 'invalid ID' });
    } else if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateCreateContact, async (req, res, next) => {
  try {
    const data = await contacts.addContact(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const data = await contacts.removeContact(id);

    if (data === 'invalidID') {
      res.status(404).json({ message: 'invalid ID' });
    } else if (data) {
      return res.status(200).json({ message: 'contact deleted' });
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId', validateUpdateContact, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const data = await contacts.updateContact(id, body);

    if (data === 'invalidID') {
      res.status(404).json({ message: 'invalid ID' });
    } else if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:contactId/favorite',
  validateUpdateFavorite,
  async (req, res, next) => {
    try {
      const id = req.params.contactId;
      const body = req.body;

      const data = await contacts.updateContact(id, body);

      if (data === 'invalidID') {
        res.status(404).json({ message: 'invalid ID' });
      } else if (data) {
        return res.status(200).json(data);
      }

      return res.status(404).json({ message: 'Not Found' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
