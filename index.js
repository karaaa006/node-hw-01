const argv = require("yargs").argv;
const contactOperations = require("./db");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactOperations.listContacts();
      if (contacts.length === 0) {
        console.log("Список контактов пуст!");
        return;
      }

      console.table(contacts);
      break;

    case "get":
      const contact = await contactOperations.getContactById(id);

      if (contact) {
        console.log("Контакт найден!\n", contact);
      } else {
        console.log("Контакт не найден!");
      }
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log("Нужно заполнить все поля (name, email, phone)!");
        return;
      }

      const newContact = await contactOperations.addContact({
        name,
        email,
        phone,
      });

      console.log("Контакт успешно добавлен!\n", newContact);
      break;

    case "remove":
      const removedContact = await contactOperations.removeContact(id);

      if (removedContact) {
        console.log("Контакт удален!\n", removedContact);
      } else {
        console.log("Контакт для удаления не найден!");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
