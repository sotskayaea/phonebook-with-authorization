import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import style from './ContactForm.module.css';
import { useDispatch } from 'react-redux';

const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const onHandleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;
    const contactData = {
      id: nanoid(),
      name: name,
      phone: number,
    };
    const foundContact = contacts.find(
      contact => contact.name === contactData.name
    );
    if (foundContact) {
      alert(`Sorry, ${foundContact.name} is already in the contact list`);
      e.currentTarget.reset();
      return;
    }
    console.log(contactData);
    dispatch(addContact(contactData));
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={onHandleSubmit} className={style.contactForm}>
      <label className={style.label}>
        Name
        <input type="text" name="name" className={style.input} required />
      </label>
      <label className={style.label}>
        Phone
        <input className={style.input} type="tel" name="number" required />
      </label>
      <button className={style.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;

// export default class ContactForm extends Component {
//   onHandleSubmit = e => {
//     e.preventDefault();
//     const name = e.currentTarget.elements.name.value;
//     const number = e.currentTarget.elements.number.value;
//     const contactData = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };
//     const foundContact = this.props.contacts.find(
//       contact => contact.name === contactData.name
//     );
//     if (foundContact) {
//       alert(`Sorry, ${foundContact.name} is already in the contact list`);
//       e.currentTarget.reset();
//       return;
//     }
//     this.props.onAddContact(contactData);
//     e.currentTarget.reset();
//   };
//   render() {
//     return (
//       <form onSubmit={this.onHandleSubmit}>
//         <label>
//           Name
//           <input
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <label>
//           Phone
//           <input
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <button type="submit">Add Contact</button>
//       </form>
//     );
//   }
// }
