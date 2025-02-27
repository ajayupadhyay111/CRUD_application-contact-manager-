import axios from "axios";

const baseUrl = "http://localhost:4000";
let newData = null;
export const GetAllContacts = async (setContacts,setFilteredContacts) => {
  try {
    fetch(`${baseUrl}/allContacts`)
      .then((res) => res.json())
      .then((data) => {
        setContacts(data)
      setFilteredContacts(data)
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

export const newContact = async (setFilteredContacts, formData) => {
  try {
    let response = await axios.post(`${baseUrl}/newContact`, formData);
    console.log(response)
    setFilteredContacts((prev) => [...prev, response.data.user]);
  } catch (error) {
    alert(error.response.data.message);
  }
};
export const updateContact = async (setFilteredContacts, contact) => {
  try {
    let response = await axios.put(`${baseUrl}/updateContact/${contact.id}`,contact);

    setFilteredContacts(prev=>prev.map(item=>item.id === response.data.data.id ? response.data.data : item))
    
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
};

export const deleteContact = async (setFilteredContacts, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/deleteContact/${id}`);
    setFilteredContacts(prev=>prev.filter(item=>item.id !== response.data.contact.id))
  } catch (error) {
    console.log(error.message || error.response.data.message);
  }
};
