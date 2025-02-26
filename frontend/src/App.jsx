import React, { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Moon, Sun } from "lucide-react";
import {
  deleteContact,
  GetAllContacts,
  newContact,
  updateContact,
} from "./apiCalls";

const App = () => {
  const [editable, setEditable] = useState(false);
  const [delitable, setDelitable] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === undefined ? false : true
  );
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [newForm, setNewForm] = useState(false);
  const [newFormData, setNewFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      await GetAllContacts(setContacts);
    })();
    setFilteredContacts(contacts)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateContact(setContacts, formData);
    setEditable(false); // Close the dialog after update
  };

  const handleDelete = async (id) => {
    await deleteContact(setContacts, id);
    setDelitable(false); // Close dialog after deletion
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleNewFormChange = (e) => {
    const { name, value } = e.target;
    setNewFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleNewContact = async (e) => {
    e.preventDefault();
    await newContact(setContacts, newFormData);
    setNewForm(false);
    setNewFormData({
      username: "",
      phoneNumber: "",
      email: "",
      address: "",
    });
  };

  const handleSearch = async (e) => {
    setSearchText(e.target.value);
    setFilteredContacts(
      contacts.filter((contact) =>
        Object.values(contact).some((value) =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  };
  console.log(filteredContacts)

  return (
    <div className="container mx-auto mt-5">
      <div className="lg:max-w-xl w-full lg:px-0 px-4 flex lg:gap-3 gap-1 mx-auto">
        <Input
          type="test"
          placeholder="Search contact"
          className="flex-1"
          value={searchText}
          onChange={handleSearch}
        />
        <Dialog open={newForm} onOpenChange={setNewForm}>
          <DialogTrigger asChild>
            <Button>+</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg w-full p-6 rounded-lg shadow-lg">
            <DialogTitle className="text-xl font-semibold mb-4">
              Add new contact
            </DialogTitle>

            <form onSubmit={handleNewContact}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newFormData.username}
                  onChange={handleNewFormChange}
                  required
                  className="mt-1 p-2 w-full border dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phoneNumber"
                  value={newFormData.phoneNumber}
                  onChange={handleNewFormChange}
                  required
                  className="mt-1 p-2 w-full border  dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newFormData.email}
                  onChange={handleNewFormChange}
                  required
                  className="mt-1 p-2 w-full border  dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300"
                >
                  Address:
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={1}
                  value={newFormData.address}
                  onChange={handleNewFormChange}
                  required
                  className="mt-1 p-2 w-full border  dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                />
              </div>

              <DialogFooter className="flex gap-2 lg:gap-0 justify-between">
                <button
                  type="button"
                  onClick={() => setNewForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                >
                  Create
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="scroll-container h-[75vh] mt-7 w-full lg:px-0 px-2 flex flex-col lg:flex-row lg:justify-around lg:flex-wrap lg:gap-y-6 gap-y-3 ">
        {Array.isArray(contacts) && contacts.length > 0 ? (
          filteredContacts?.map((contact, _) => {
            return (
              <Card
                key={contact?.id}
                className="lg:w-[600px] md:w-full sm:h-[210px] h-[200px] border rounded-lg shadow-lg md:p-4 p-2"
              >
                <CardContent>
                  <h2 className="text-2xl font-semibold dark:text-white text-gray-800">
                    {contact?.username}
                  </h2>
                  <div className="text-lg text-gray-500">
                    <p>Email: {contact?.email}</p>
                    <p>Phone: {contact?.phoneNumber}</p>
                    <p>Address: {contact?.address}</p>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Dialog open={editable} onOpenChange={setEditable}>
                      <DialogTrigger asChild>
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEdit
                            size={20}
                            onClick={() => {
                              setEditable(false);
                              setFormData(contact);
                            }}
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg w-full p-6 rounded-lg shadow-lg">
                        <DialogTitle className="text-xl font-semibold mb-4">
                          Update Your Information
                        </DialogTitle>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Username:
                            </label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              required
                              className="mt-1 p-2 w-full border dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Phone:
                            </label>
                            <input
                              type="text"
                              id="phone"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              required
                              className="mt-1 p-2 w-full border  dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Email:
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="mt-1 p-2 w-full border  dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-300"
                            >
                              Address:
                            </label>
                            <textarea
                              id="address"
                              name="address"
                              rows={1}
                              value={formData.address}
                              onChange={handleChange}
                              required
                              className="mt-1 p-2 w-full border  dark:font-semibold dark:bg-transparent border-gray-300 rounded-md focus:outline-none dark:text-white"
                            />
                          </div>

                          <DialogFooter className="flex gap-2 lg:gap-0 justify-between">
                            <button
                              type="button"
                              onClick={() => setEditable(false)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                              onClick={handleSubmit}
                            >
                              Update
                            </button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={delitable} onOpenChange={setDelitable}>
                      <DialogTrigger asChild>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTrash
                            size={20}
                            onClick={() => setDelitable(false)}
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm w-full p-6  rounded-lg shadow-lg">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                          Are you sure?
                        </DialogTitle>
                        <p className="text-sm text-gray-600 mb-4">
                          Do you really want to delete this item? This action
                          cannot be undone.
                        </p>

                        <DialogFooter className="flex gap-2 lg:gap-0 justify-between">
                          <button
                            type="button"
                            onClick={() => setDelitable(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(contact.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                          >
                            Delete
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>No contact added yet</p>
        )}
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-12 h-12 ml-3 mt-4 rounded-full flex items-center justify-center 
      bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-300
      transition-all duration-300 shadow-lg"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};

export default App;
