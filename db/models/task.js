'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      taskName: DataTypes.STRING,
      listId: DataTypes.INTEGER,
      completed: DataTypes.BOOLEAN,
      expires: DataTypes.DATE
    },
    {}
  );
  Task.associate = function (models) {
    Task.belongsTo(models.List, {
      foreignKey: 'listId',
      onDelete: 'cascade',
      hook: true
    });
  };
  return Task;
};
