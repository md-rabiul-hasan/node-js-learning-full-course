const Sequelize = require('sequelize');

// Create a new instance of Sequelize and connect to the database
const sequelize = new Sequelize('nodejs_sequelize', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;