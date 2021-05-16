const Contacts = require('./schemas/contacts');

const listContacts = async () => {
  try {
    const data = await Contacts.find({});

    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const getContactById = async (id) => {
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contacts.findById(id);
      console.log(data);
      return data;
    } else {
      return 'invalidID';
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const addContact = async (body) => {
  try {
    const data = await Contacts.create(body);

    return data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const removeContact = async (id) => {
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contacts.findByIdAndRemove(id);
      return data;
    } else {
      return 'invalidID';
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const updateContact = async (id, body) => {
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contacts.findByIdAndUpdate(
        id,
        { ...body },
        { new: true }
      );
      return data;
    } else {
      return 'invalidID';
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
