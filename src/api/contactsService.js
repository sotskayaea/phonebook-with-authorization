import axios from 'axios';
const API_URL = 'https://connections-api.herokuapp.com/contacts';

class ContactsService {
  fetchContacts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };
  createContact = async newContact => {
    console.log(newContact);
    const response = await axios.post(API_URL, newContact);
    return response.data;
  };
  deleteContact = async contactId => {
    const response = await axios.delete(`${API_URL}/${contactId}`);
    return response.data;
  };

  editContact = async newContact => {
    const response = await axios.patch(`${API_URL}/${newContact.id}`, {
      name: newContact.name,
      number: newContact.number,
    });
    return response.data;
  };
}

const contactsService = new ContactsService();
export { contactsService };
