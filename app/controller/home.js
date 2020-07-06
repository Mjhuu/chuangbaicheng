'use strict';

const Controller = require('egg').Controller;
const { produceArr } = require('./../data');
const dayjs = require('dayjs');

class HomeController extends Controller {
  // 后台管理
  async adminManage() {
    const { ctx } = this;
    await ctx.render('admin');
  }
  // 售后服务
  async services() {
    const { ctx } = this;
    await ctx.render('services', {
      produceArr,
      title: '售后服务-青岛创百城显示科技',
      nav: '售后服务',
    });
  }
  // 技术支持
  async technology() {
    const { ctx } = this;
    await ctx.render('technology', {
      produceArr,
      title: '技术支持-青岛创百城显示科技',
      nav: '技术支持',
    });
  }
  // 关于我们
  async about() {
    const { ctx } = this;
    await ctx.render('other', {
      produceArr,
      title: '关于我们-青岛创百城显示科技',
      nav: '关于我们',
    });
  }
  // 首页
  async index() {
    const { ctx } = this;
    await ctx.render('index', {
      produceArr,
      title: '青岛创百城显示科技',
    });
  }
  // 产品分类页
  async kind() {
    const { ctx, service } = this;
    const { kindName } = ctx.params;
    const data = await service.produce.getProduceList({ kind: kindName, keyWord: '' });
    let produceList = [];
    if (data.code === 200) {
      produceList = data.result.produceList;
    }
    produceList.forEach(item => {
      item.imgUrl = JSON.parse(item.imgUrl);
    });
    let errCode = 0;
    if (!produceArr.includes(kindName)) {
      errCode = 404;
    }
    await ctx.render('kind', {
      produceArr,
      kindName,
      errCode,
      produceList,
      title: `${kindName}-青岛创百城显示科技`,
    });
  }
  // 产品详情页
  async produce() {
    const { ctx, service } = this;
    const { produceName } = ctx.params;
    let kindName = '未知';
    let produceInfo = {};
    let errCode = 0;
    const data = await service.produce.byNameGetProduceInfo({ produceName });
    if (data.code === 200) {
      produceInfo = data.result.produceInfo;
      kindName = produceInfo.kind;
      produceInfo.imgUrl = JSON.parse(produceInfo.imgUrl);
      produceInfo.createdAt = dayjs(produceInfo.createdAt).format('YYYY-MM-DD hh:mm:ss');
    } else {
      errCode = 404;
    }
    await ctx.render('produce', {
      produceArr,
      produceName,
      kindName,
      errCode,
      produceInfo,
      title: `${produceName}-青岛创百城显示科技`,
    });
  }
  // 案例分类页
  async eg() {
    const { ctx, service } = this;
    const { egName } = ctx.params;
    const data = await service.egProduce.getEgProduceList({ kind: egName, keyWord: '' });
    let produceList = [];
    if (data.code === 200) {
      produceList = data.result.produceList;
    }
    produceList.forEach(item => {
      item.imgUrl = JSON.parse(item.imgUrl);
    });
    let errCode = 0;
    if (!produceArr.includes(egName)) {
      errCode = 404;
    }
    await ctx.render('eg', {
      produceArr,
      egName,
      errCode,
      produceList,
      title: `${egName}-青岛创百城显示科技`,
    });
  }
  // 案例详情页
  async egProduce() {
    const { ctx, service } = this;
    const { produceName } = ctx.params;
    let kindName = '未知';
    let produceInfo = {};
    let errCode = 0;
    const data = await service.egProduce.byNameGetProduceInfo({ produceName });
    if (data.code === 200) {
      produceInfo = data.result.produceInfo;
      kindName = produceInfo.kind;
      produceInfo.imgUrl = JSON.parse(produceInfo.imgUrl);
      produceInfo.createdAt = dayjs(produceInfo.createdAt).format('YYYY-MM-DD hh:mm:ss');
    } else {
      errCode = 404;
    }
    await ctx.render('egProduce', {
      produceArr,
      produceName,
      egName: kindName,
      errCode,
      produceInfo,
      title: `${produceName}-青岛创百城显示科技`,
    });
  }
}

module.exports = HomeController;
