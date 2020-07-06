'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('cbc', 'root', 'zx999599', { host: 'localhost', dialect: 'mysql' });

sequelize.authenticate().then(() => {
  console.log('数据库连接成功');
}).catch(err => {
  console.error('数据库连接失败:', err);
});

module.exports = sequelize;
