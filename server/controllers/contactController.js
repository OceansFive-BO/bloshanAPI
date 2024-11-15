import { Contact } from '../db/models.js';
const logAndSendStatus = (e, res, statusCode = 500) => {
  console.error(e);
  res.sendStatus(statusCode);
};
export const saveNewContact = async (req, res) => {
  const contactEntry = req.body;
  try {
    const contact = await Contact.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    logAndSendStatus(error, res);
  }
};