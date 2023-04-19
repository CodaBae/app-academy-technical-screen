const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect,
  }
);

module.exports = sequelize;