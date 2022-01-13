const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const res = JSON.parse(data);

  return res;
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const res = contactsArray.find(
    (contact) => contact.id === contactId.toString()
  );

  if (!res) return null;

  return res;
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const idx = contactsArray.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (idx === -1) return null;

  const removedContact = contactsArray[idx];
  contactsArray.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));

  return removedContact;
}

async function addContact({ name, email, phone }) {
  const contactsArray = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contactsArray.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));

  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
