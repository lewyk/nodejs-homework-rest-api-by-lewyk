const fs = require('fs/promises');
const path = require('path');
const contacts = path.join('model', 'contacts.json');
const shortid = require('shortid');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts);

    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const getContactById = async (contactId) => {
  try {
    contactId = Number(contactId);
    const data = await listContacts().then((data) =>
      data.find((contact) => contact.id === contactId)
    );

    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const addContact = async (body) => {
  try {
    const id = shortid.generate();

    const newContact = { id, ...body };

    const allContacts = await listContacts().then((data) => data);

    await fs.writeFile(contacts, JSON.stringify([...allContacts, newContact]));

    return newContact;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const removeContact = async (contactId) => {
  try {
    contactId = Number(contactId);

    const allContacts = await listContacts().then((data) => data);

    const data = allContacts.filter((contact) => contact.id !== contactId);

    if (allContacts.length > data.length) {
      fs.writeFile(contacts, JSON.stringify(data));
      return data;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const updateContact = async (contactId, body) => {
  try {
    contactId = Number(contactId);

    const allContacts = await listContacts().then((data) => data);

    const idx = allContacts.findIndex((contact) => contact.id === contactId);

    const updContact = { ...allContacts[idx], ...body };

    allContacts.splice(idx, 1, updContact);

    if (idx !== -1) {
      fs.writeFile(contacts, JSON.stringify(allContacts));
      console.log(updContact);
      return updContact;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
