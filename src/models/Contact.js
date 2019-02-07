module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Contact name cannot be empty',
        },
        len: {
          args: [2, 50],
          msg: 'Contact name nust be between 2 and 50 characters',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This phone number is already registered to an existing Contact',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Phone number cannot be empty',
        },
        isInt: {
          args: true,
          msg: 'Phone number must be a valid integer',
        },
      },
    },
  });

  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sentMessages',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receivedMessages',
    });
  };

  return Contact;
};
