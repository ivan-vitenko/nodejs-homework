const contacts = require('./contacts');

// contacts.addContact('new name', 'new@mail.com', '374503945803948');

const argv = require('yargs').argv;
// console.log(argv);

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then(data => console.table(data));
      break;

    case 'get':
      contacts.getContactById(id).then(data => console.log(data));
      break;

    case 'add':
      contacts.addContact(name, email, phone);
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
