'use strict';

const Controller = require('egg').Controller;

class EgProduceController extends Controller {
  async addEgProduce() {
    const { ctx, service } = this;
    const { kind, produceName, video, readCount, imgUrl, videoTime, adminId } = ctx.request.body;
    const data = await service.egProduce.addEgProduce({ kind, produceName, video, readCount, imgUrl, videoTime, adminId });
    ctx.body = data;
  }
  async delEgProduce() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const data = await service.egProduce.delEgProduce({ id });
    ctx.body = data;
  }
  async getEgProduceList() {
    const { ctx, service } = this;
    const { kind, keyWord } = ctx.query;
    const data = await service.egProduce.getEgProduceList({ kind, keyWord });
    ctx.body = data;
  }
}

module.exports = EgProduceController;
