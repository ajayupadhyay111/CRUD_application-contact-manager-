import axios from "axios";

const baseUrl = "http://localhost:4000";
let newData = null;
export const GetAllContacts = async (setContacts) => {
  try {
    fetch(`${baseUrl}/allContacts`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

export const newContact = async (setContacts, formData) => {
  try {
    let response = await axios.post(`${baseUrl}/newContact`, formData);
    console.log(response)
    setContacts((prev) => [...prev, response.data.user]);
  } catch (error) {
    alert(error.response.data.message);
  }
};
export const updateContact = async (setContacts, contact) => {
  try {
    let response = await axios.put(`${baseUrl}/updateContact/${contact.id}`,contact);

    setContacts(prev=>prev.map(item=>item.id === response.data.data.id ? response.data.data : item))
    
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
};

export const deleteContact = async (setContacts, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/deleteContact/${id}`);
    setContacts(prev=>prev.filter(item=>item.id !== response.data.contact.id))
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
};
