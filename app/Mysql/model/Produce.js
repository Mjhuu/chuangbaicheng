'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./../connection');

const Produce = sequelize.define('produce', {
  kind: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  produceName: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
  },
  video: {
    type: Sequelize.TEXT,
  },
  videoTime: {
    type: Sequelize.STRING(80),
  },
  readCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10000,
  },
  imgUrl: {
    type: Sequelize.TEXT,
  },
}
);

module.exports = Produce;
