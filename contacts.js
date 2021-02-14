const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

// * Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, 'db');
// console.log(contactsPath);

// TODO: задокументировать каждую функцию
function listContacts() {
  //   console.log(fs.opendir(contactsPath));

  return fs
    .readFile(`${contactsPath}/contacts.json`)
    .then(contacts => JSON.parse(contacts.toString()))
    .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  return listContacts()
    .then(contacts => contacts.find(contact => contact.id === contactId))
    .catch(err => console.log(err.message));
}

function removeContact(contactId) {
  listContacts()
    .then(contacts => {
      fs.writeFile(
        `${contactsPath}/contacts.json`,

        JSON.stringify(
          contacts.filter(contact => contact.id !== contactId),
          null,
          2,
        ),
      );
    })
    .catch(err => console.log(err.message));
}

function addContact(name, email, phone) {
  const id = shortid.generate();

  listContacts()
    .then(contacts => {
      fs.writeFile(
        `${contactsPath}/contacts.json`,

        JSON.stringify([...contacts, { id, name, email, phone }], null, 2),
      );
    })
    .catch(err => console.log(err.message));
}

// getContactById(3).then(contact => console.log(contact));
// removeContact(2);
// addContact('some name', 'some@mail.com', '3274539847593');

module.exports = { listContacts, getContactById, removeContact, addContact };
