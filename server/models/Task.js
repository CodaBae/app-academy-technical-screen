const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../sequelize');

const User = require('./User');

// Define the Task model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
   
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Define the association between User and Task
User.hasMany(Task);
Task.belongsTo(User);

// Synchronize the model with the database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

module.exports = Task;