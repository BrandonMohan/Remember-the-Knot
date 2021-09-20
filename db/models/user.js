'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      emailAddress: DataTypes.STRING,
      hashedPassword: DataTypes.STRING
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.List, { foreignKey: 'userOwner' });
  };
  return User;
};
