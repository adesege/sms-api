import express from 'express';
import contact from './controllers/Contact';
import message from './controllers/Message';

const routes = express.Router();

routes.post('/contacts', contact.createContact);

routes.get('/contacts/:id?', contact.getContacts);
routes.delete('/contacts/:id?', contact.deleteContact);

routes.get('/contacts/:id?/messages?', contact.getContacts);

routes.post('/messages/:id?/', message.createMessage);
routes.get('/messages/:id?/', message.getMessages);
routes.delete('/messages/:id?/', message.deleteMessage);

routes.get('/', (_, res) => res.send({ message: 'Welcome to the SMS API' }));

export default routes;
