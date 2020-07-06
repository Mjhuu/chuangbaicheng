'use strict';

const Controller = require('egg').Controller;

class OtherController extends Controller {
  async saveOther() {
    const { ctx, service } = this;
    const { kind, content, adminId } = ctx.request.body;
    const data = await service.other.saveOther({ kind, content, adminId });
    ctx.body = data;
  }
  async getOther() {
    const { ctx, service } = this;
    const { kind } = ctx.query;
    const data = await service.other.getOther({ kind });
    ctx.body = data;
  }
}

module.exports = OtherController;
