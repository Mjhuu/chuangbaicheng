'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async adminLogin() {
    const { ctx, service } = this;
    const { admin, password } = ctx.request.body;
    const data = await service.admin.login(admin, password);
    ctx.body = data;
  }
  async revisePwd() {
    const { ctx, service } = this;
    const { oldPassword, newPassword, id } = ctx.request.body;
    const data = await service.admin.revisePwd({ oldPassword, newPassword, id });
    ctx.body = data;
  }
}

module.exports = AdminController;
