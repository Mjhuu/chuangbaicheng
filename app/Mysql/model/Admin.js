'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./../connection');

const Admin = sequelize.define('admin', {
  admin: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(80),
    allowNull: false,
  },
}
);

module.exports = Admin;
