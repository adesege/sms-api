import models from '../models';

const { Message, Contact } = models;

export default {
  async createContact(req, res) {
    const { body } = req;
    try {
      const result = await Contact.create(body);
      return res
        .status(201)
        .send({ message: `Successfully added ${body.name}`, result });
    } catch (error) {
      return res.status(500).send({
        message: 'There was an error fulfilling your request',
      });
    }
  },

  async getContacts(req, res) {
    const { id } = req.params;
    const query = id ? { where: { id } } : {};
    query.include = id
      && req.url.split('/').pop() === 'messages'
      && [
        { model: Message, as: 'sentMessages' },
        { model: Message, as: 'receivedMessages' },
      ];
    const Service = id ? Contact.findOne : Contact.findAll;
    try {
      const result = await Service.call(Contact, query);
      return result
        ? res.status(200).send({ message: 'Success', result })
        : res.status(404).send({ message: 'Contact not Found', result });
    } catch (error) {
      return res.status(500).send({
        message: 'There was an error fulfilling your request',
      });
    }
  },

  deleteContact(req, res) {
    const { id } = req.params;
    const query = id ? { where: { id } } : {};
    try {
      const result = Contact.destroy(query);
      return result
        ? res.status(200).send({ deleted: true, message: 'Deleted' })
        : res.status(200).send({ deleted: false, message: 'Not deleted' });
    } catch (error) {
      return res.status(500).send({
        message: 'There was an error fulfilling your request',
      });
    }
  },
};
