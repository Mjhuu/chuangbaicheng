'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./../connection');

const Other = sequelize.define('other', {
  kind: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
  },
}
);

module.exports = Other;
