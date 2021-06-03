const Contacts = require('./schemas/contacts');

const listContacts = async (userId, query) => {
  const {
    limit = 10,
    offset = 0,
    sortBy,
    sortByDesc,
    filter,
    favorite = null
  } = query;
  const searchOptions = { owner: userId };

  try {
    if (favorite !== null) {
      searchOptions.favorite = favorite;
    }

    const data = await Contacts.paginate(searchOptions, {
      limit,
      offset,
      select: filter ? filter.split('|').join(' ') : '',
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {})
      }
    });
    const { docs: contacts, totalDocs: total } = data;

    return { contacts, total, limit, offset };
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const getContactById = async (userId, contactId) => {
  try {
    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contacts.findOne({
        _id: contactId,
        owner: userId
      }).populate({
        path: 'owner',
        select: 'email subscription -_id'
      });

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

const removeContact = async (userId, contactId) => {
  try {
    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contacts.findOneAndRemove({
        _id: contactId,
        owner: userId
      });

      return data;
    } else {
      return 'invalidID';
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const updateContact = async (userId, contactId, body) => {
  try {
    if (contactId.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await Contacts.findOneAndUpdate(
        {
          _id: contactId,
          owner: userId
        },
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
