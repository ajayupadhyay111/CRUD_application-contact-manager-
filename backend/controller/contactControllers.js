import { userModel } from "../postgres/postgres.js";
import { json, Op } from "sequelize";

export const getAllContact = async (request, response) => {
  try {
    let contacts = await userModel.findAll();
    if (contacts.length == 0) {
      return response.status(200).json({ message: "No contacts yet" });
    }
    return response.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const newContact = async (request, response) => {
  try {
    // console.log(request.body)
    const { username, email, phoneNumber, address } = request.body;
    if (!username || !email || !phoneNumber || !address) {
      return response.status(404).json({ message: "All fields required" });
    }
    const existingUser = await userModel.findOne({
      where: {
        [Op.or]: [{ email: email }, { phoneNumber:phoneNumber }],
      },
    });
    console.log(existingUser)
    if (existingUser) {
      return response.status(400).json({ message: "User already exists" });
    }

    const newUser = await userModel.create({
      username,
      email,
      phoneNumber,
      address,
    });

    return response
      .status(201)
      .json({ message: "Contact added", user: newUser });
  } catch (error) {
    console.log("error in registering user ", error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const updateContact = async (request, response) => {
  let { id } = request.params;
  console.log("updated contact ",request.body);
  if (id == 0) {
    return response.status(404).json({ message: "Not found" });
  }
  try {
    let [updatedRows,updatedData] = await userModel.update(request.body, {
      where: { id: id },
      returning: true, // ✅ This returns updated data (only in PostgreSQL)
    });
    // console.log(updatedData[0].dataValues)
    return response.status(200).json({ message: "Contact updated",data:updatedData[0].dataValues});
  } catch (error) {
    console.log("error in update contact ", error.message);
    return response.status(500).json({ message: "Interval server error" });
  }
};

export const deleteContact = async (request, response) => {
  try {
    const { id } = request.params;
    const contact = await userModel.findOne({ where: { id } });
    await contact.destroy();
    if (contact) {
      return response.status(200).json({ message: "Contact deleted",contact });
    }
    return response.status(404).json({ message: "Contact not found" });
  } catch (error) {
    console.log("error in deleting user ", error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
};
