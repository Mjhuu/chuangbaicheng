'use strict';

const Service = require('egg').Service;
const Model = require('./../Mysql/model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ProduceService extends Service {
  // 通过produceName获取信息
  async byNameGetProduceInfo({ produceName }) {
    const produce = await Model.Produce.findOne({
      where: {
        produceName,
      },
    }).catch(() => {});
    if (!produce) {
      return {
        code: 500,
        data: '没有此产品哦',
      };
    }
    produce.readCount += 1;
    await produce.save();
    return {
      code: 200,
      data: '获取成功',
      result: {
        produceInfo: produce,
      },
    };
  }
  async delProduce({ id }) {
    const produce = await Model.Produce.findByPk(id);
    if (!produce) {
      return {
        code: 500,
        data: '没有此产品哦',
      };
    }
    await produce.destroy();
    return {
      code: 200,
      data: '删除成功',
    };
  }
  async saveProduce({ id, content, produceName, video, videoTime, type }) {
    type = Number(type);
    const produce = await Model.Produce.findByPk(id);
    if (!produce) {
      return {
        code: 500,
        data: '没有此产品',
      };
    }
    produce.produceName = produceName;
    produce.content = content;
    if (type === 1) {
      produce.video = video;
      produce.videoTime = videoTime;
    }
    await produce.save();
    return {
      code: 200,
      data: '保存成功',
    };
  }
  async getProduceList({ kind, keyWord = '' }) {
    const produceList = await Model.Produce.findAll({
      where: {
        [Op.and]: [
          { kind },
          { produceName: { [Op.like]: `%${keyWord}%` } },
        ],
      },
      order: [
        [ 'id', 'DESC' ],
      ],
    });
    return {
      code: 200,
      data: '获取成功',
      result: {
        produceList,
      },
    };
  }
  async addProduce({ kind, produceName, content, video, readCount, imgUrl, videoTime, adminId }) {
    let produce = await Model.Produce.findOne({
      where: {
        produceName,
      },
    });
    if (produce) {
      return {
        code: 500,
        data: '产品重复，已存在同名产品',
      };
    }
    produce = await Model.Produce.create({
      kind, produceName, content, video, readCount, imgUrl, videoTime, adminId,
    });
    return {
      code: 200,
      data: '产品发布成功',
    };
  }
}

module.exports = ProduceService;
