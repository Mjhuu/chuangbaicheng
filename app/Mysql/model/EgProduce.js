'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./../connection');

const EgProduce = sequelize.define('egProduce', {
  kind: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  produceName: {
    type: Sequelize.STRING(40),
    allowNull: false,
  },
  video: {
    type: Sequelize.TEXT,
  },
  readCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10000,
  },
  imgUrl: {
    type: Sequelize.TEXT,
  },
  videoTime: {
    type: Sequelize.STRING(80),
  },
}
);

module.exports = EgProduce;
