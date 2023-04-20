const Sequelize = require('sequelize');
const config = require('./config');

// const sequelize = new Sequelize({
//   dialect: config.development.dialect,
//   host: config.development.host,
//   port: 5432,
//   username: config.development.database,
//   password: config.development.username,
//   database: config.development.password,
//   ssl: true, // set to true if you want to use SSL
//   dialectOptions: {
//     ssl: {
//       require: true
//     }
//   }
// });

const sequelize = new Sequelize(config.development.database)


// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();


module.exports = sequelize;
