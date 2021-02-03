import { v4 as makeUniqId } from "uuid";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";
import { useState } from "react";

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === "name") {
      setName(value);
    }
    if (name === "number") {
      setNumber(value);
    }
  };

  const matchContact = (contact) => {
    const contactNames = contacts.reduce((acc, { name }) => [...acc, name], []);

    return contactNames.includes(contact);
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotUniqContactName = matchContact(name);

    if (isNotUniqContactName) {
      return alert(`${name} is alredy in contacts!`);
    } else if (name.trim() && number.trim()) {
      const id = makeUniqId();
      const contact = { name, number, id };

      onSubmit(contact);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor="name" className={s.label}>
        Name
      </label>
      <input
        type="text"
        placeholder="Type name!"
        name="name"
        value={name}
        onChange={handleChange}
        className={s.input}
        id="name"
      />

      <label htmlFor="number" className={s.label}>
        Number
      </label>
      <input
        type="tel"
        placeholder="Type number!"
        name="number"
        value={number}
        onChange={handleChange}
        className={s.input}
        id="number"
      />

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ),
  ]),
  onSubmit: PropTypes.func.isRequired,
};
