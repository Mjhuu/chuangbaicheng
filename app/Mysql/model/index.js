'use strict';

const sequelize = require('./../connection');

const Admin = require('./Admin');
const EgProduce = require('./EgProduce');
const Produce = require('./Produce');
const Other = require('./Other');

Admin.hasMany(EgProduce);
EgProduce.belongsTo(Admin);

Admin.hasMany(Produce);
Produce.belongsTo(Admin);

Admin.hasMany(Other);
Other.belongsTo(Admin);

/* 强制重构表*/
// sequelize.sync({ force: true }).then(d=> {
//   console.log('所有表初始化完成，所有表已重构。');
// });
/* 同步最新的模型到数据库*/
// sequelize.sync({ alter: true }).then(d => {
//   console.log('同步所有表最新的模型到数据库，数据保留。');
// });

module.exports = {
  Admin, EgProduce,
  Produce, Other,
};
