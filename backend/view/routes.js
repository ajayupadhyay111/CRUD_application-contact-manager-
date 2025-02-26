import express from 'express'
import { deleteContact, getAllContact,newContact, updateContact } from '../controller/contactControllers.js';

const router = express.Router();

router.get("/allContacts",getAllContact)
router.post("/newContact",newContact)
router.put("/updateContact/:id",updateContact)
router.delete("/deleteContact/:id",deleteContact)

export default router;