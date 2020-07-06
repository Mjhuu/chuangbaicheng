'use strict';

const Service = require('egg').Service;
const Model = require('./../Mysql/model');

class AdminService extends Service {
  async revisePwd({ oldPassword, newPassword, id }) {
    const admin = await Model.Admin.findByPk(id);
    if (!admin) {
      return {
        code: 500,
        data: '管理员不存在',
      };
    }
    if (admin.password !== oldPassword) {
      return {
        code: 500,
        data: '旧密码错误',
      };
    }
    admin.set('password', newPassword);
    await admin.save();
    return {
      code: 200,
      data: '密码修改成功',
    };
  }
  async login(admin, password) {
    // password = md5(password);
    const data = await Model.Admin.findOne({
      where: { admin, password },
    });
    if (!data) {
      return {
        code: 500,
        data: '账号或密码错误',
      };
    }
    return {
      code: 200,
      data: '登录成功',
      result: {
        adminInfo: data,
      },
    };
  }
}

module.exports = AdminService;
