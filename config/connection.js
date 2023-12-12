const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.JAWSDB_NAME,
  process.env.JAWSDB_USER,
  process.env.JAWSDB_PASSWORD,
  {
    host: process.env.JAWSDB_HOST,
    dialect: 'mysql',
    port: process.env.JAWSDB_PORT || 3306,
  }
);

module.exports = sequelize;
