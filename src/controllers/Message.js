import models from '../models';

const { Message } = models;

export default {
  createMessage: async (req, res) => {
    const { body } = req;
    try {
      const result = await Message.create(body);
      return res.status(201).send({
        message: 'message sent', result,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'There was an error fulfilling your request',
      });
    }
  },

  async getMessages(req, res) {
    const { id } = req.params;
    const query = id ? { where: { id } } : {};
    const Service = id ? Message.findOne : Message.findAll;
    try {
      const result = await Service.call(Message, query);
      return result
        ? res.status(200).send({ message: 'Success', result })
        : res.status(404).send({ message: 'data not Found', result });
    } catch (error) {
      return res.status(500).send({
        message: 'There was an error fulfilling your request',
      });
    }
  },

  async deleteMessage(req, res) {
    const { id } = req.params;
    try {
      const result = await Message.destroy({ where: { id } });
      return result
        ? res.status(200).send({ message: 'Message has been deleted successfully' })
        : res.status(200).send({ deleted: false, message: 'Not deleted' });
    } catch (error) {
      return res.status(500).send({
        message: 'There was an error fulfilling your request',
      });
    }
  },
};
