'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      listName: DataTypes.STRING,
      userOwner: DataTypes.INTEGER
    },
    {}
  );
  List.associate = function (models) {
    List.belongsTo(models.User, { foreignKey: 'userOwner' });
    List.hasMany(models.Task, { foreignKey: 'listId' });
  };
  return List;
};
