const Contacts = require('../model/contacts');
const { HttpCode } = require('../helpers/constants');

const getAll = async (req, res, next) => {
  const userId = req.user.id;
  const query = req.query;

  try {
    const { contacts } = await Contacts.listContacts(userId, query);

    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const userId = req.user.id;
  const contactId = req.params.contactId;

  try {
    const contact = await Contacts.getContactById(userId, contactId);

    if (contact) {
      return res.status(HttpCode.OK).json(contact);
    }

    return res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const body = req.body;

  if (JSON.stringify(body) === '{}') {
    return res
      .status(HttpCode.OK)
      .json({ message: 'missing required name field' });
  }
  const userId = req.user.id;

  try {
    const contact = await Contacts.addContact({ ...req.body, owner: userId });

    return res.status(HttpCode.CREATED).json(contact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const userId = req.user.id;
  const contactId = req.params.contactId;

  try {
    const contact = await Contacts.removeContact(userId, contactId);
    if (contact) {
      return res.status(HttpCode.OK).json(contact);
    }

    return res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const body = req.body;

  if (JSON.stringify(body) === '{}') {
    return res.status(HttpCode.OK).json({ message: 'missing fields' });
  }

  const userId = req.user.id;
  const contactId = req.params.contactId;

  try {
    const contact = await Contacts.updateContact(userId, contactId, body);
    if (contact) {
      return res.status(HttpCode.OK).json(contact);
    }

    return res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
};
