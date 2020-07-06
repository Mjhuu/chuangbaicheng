'use strict';

const Controller = require('egg').Controller;

class ProduceController extends Controller {
  async delProduce() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const data = await service.produce.delProduce({ id });
    ctx.body = data;
  }
  async saveProduce() {
    const { ctx, service } = this;
    const { id, content, produceName, video, videoTime, type } = ctx.request.body;
    const data = await service.produce.saveProduce({ id, content, produceName, video, videoTime, type });
    ctx.body = data;
  }
  async getProduceList() {
    const { ctx, service } = this;
    const { kind, keyWord } = ctx.query;
    const data = await service.produce.getProduceList({ kind, keyWord });
    ctx.body = data;
  }
  async addProduce() {
    const { ctx, service } = this;
    const { kind, produceName, content, video, readCount, imgUrl, videoTime, adminId } = ctx.request.body;
    const data = await service.produce.addProduce({ kind, produceName, content, video, readCount, imgUrl, videoTime, adminId });
    ctx.body = data;
  }
}

module.exports = ProduceController;
