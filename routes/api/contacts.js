const express = require('express');
const router = express.Router();
const contacts = require('../../model/index');
const { v4: uuid } = require('uuid');

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
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = await contacts.addContact(req.body);
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const data = await contacts.removeContact(id);
    if (data) {
      return res.status(200).json({ message: 'contact deleted' });
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId', async (req, res, next) => {
  try {
    const data = await contacts.updateContact(req.params.contactId, req.body);
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
