import { fetchAllContacts } from '../../redux/operations';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from 'components/ContactItem/ContactItem';

import style from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const isLoading = useSelector(state => state.contacts.isLoading);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(item => {
    const contact = item.name.toLowerCase();
    return contact.includes(filter.toLowerCase());
  });

  return (
    <div className={style.contactListWrapper}>
      {isLoading && (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#d50000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {filteredContacts.length === 0 && !isLoading ? (
        <p className={style.noContactsMessage}>
          Oops... you don`t have any contacts.
        </p>
      ) : (
        <ul className={style.contactList}>
          {filteredContacts.map(contact => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
