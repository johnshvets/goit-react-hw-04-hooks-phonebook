import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import s from "./App.module.css";
import { useEffect, useState } from "react";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onContactFormSubmit = (contact) => {
    setContacts((contacts) => [...contacts, contact]);
  };

  const filterContactsByKeyWord = () => {
    const keyWord = filter.toLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(keyWord));
  };

  const onFilterContactsChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const deleteContact = ({ target }) => {
    setContacts((contacts) => contacts.filter(({ id }) => id !== target.id));
  };

  return (
    <div className={s.app}>
      <h1 className={s.logo}>Phonebook</h1>
      <div className={s.container}>
        <ContactForm
          contacts={filterContactsByKeyWord()}
          onSubmit={onContactFormSubmit}
        />
        <div className={s.contactsContainer}>
          <h2 className={s.title}>Contacts</h2>
          <Filter value={filter} onChange={onFilterContactsChange} />
          <ContactList
            contacts={filterContactsByKeyWord()}
            handleClick={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
