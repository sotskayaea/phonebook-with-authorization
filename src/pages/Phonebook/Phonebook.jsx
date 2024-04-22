import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import style from './Phonebook.module.css';

const Phonebook = () => {
  return (
    <div className={style.phonebook}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={style.subtitle}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default Phonebook;
