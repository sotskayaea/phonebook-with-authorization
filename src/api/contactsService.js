import axios from 'axios';
const API_URL = 'https://65fc7dd49fc4425c65303f94.mockapi.io/contacts';

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
    const response = await axios.put(`${API_URL}/${newContact.id}`, newContact);
    return response.data;
  };
}

const contactsService = new ContactsService();
export { contactsService };
