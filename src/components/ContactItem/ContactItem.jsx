import style from './ContactItem.module.css';
import editIcon from '../../image/edit.png';
import {
  fetchAllContacts,
  deleteContact,
  editContact,
} from '../../redux/operations';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [newName, setNewName] = useState(contact.name);
  const [newPhone, setNewPhone] = useState(contact.phone);

  const deleteUpdateContacts = contactId => {
    dispatch(deleteContact(contactId)).then(() => {
      return dispatch(fetchAllContacts());
    });
  };

  const onOpenEditForm = () => {
    setIsShowEditModal(true);
  };

  const onCancelBtn = () => {
    setIsShowEditModal(false);
    setNewName(contact.name);
    setNewPhone(contact.phone);
  };

  const onSubmitEditForm = e => {
    e.preventDefault();
    setIsShowEditModal(false);

    const newContact = {
      ...contact,
      name: newName,
      phone: newPhone,
    };

    console.log(newContact);
    dispatch(editContact(newContact));
  };

  return (
    <li
      className={cn(style.contactList__item, {
        [style.active]: isShowEditModal,
      })}
    >
      <div className={style.contact_wrap}>
        <div className={style.name_wrap}>
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
        </div>
        <ul className={style.updateButtons}>
          <li>
            <button
              type="button"
              onClick={() => deleteUpdateContacts(contact.id)}
              className={style.contactList__button}
            >
              Delete
            </button>
          </li>
          <li>
            <button
              className={style.edit_button}
              type="button"
              onClick={onOpenEditForm}
            >
              <img className={style.editIcon} src={editIcon} alt="edit-icon" />
            </button>
          </li>
        </ul>
      </div>
      <div className={style.drop_down}>
        <form className={style.edit_form} onSubmit={onSubmitEditForm}>
          <div className={style.input_wrap}>
            <div className={style.input_container}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className={style.input_field}
              />
            </div>
            <div className={style.input_container}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
                className={style.input_field}
              />
            </div>
          </div>
          <div className={style.button_container}>
            <button type="submit" className={style.save_button}>
              Save
            </button>
            <button
              type="button"
              className={style.cancel_button}
              onClick={onCancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default ContactItem;
