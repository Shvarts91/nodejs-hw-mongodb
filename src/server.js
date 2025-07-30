import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const PORT = Number(process.env.PORT);

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(pinoHttp({ logger }));

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const contactId = req.params.contactId;

    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('/', (req, res, next) =>
    res.status(404).json({
      message: 'Not found',
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
