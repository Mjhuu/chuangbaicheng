'use strict';

const Service = require('egg').Service;
const Model = require('./../Mysql/model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class EgProduceService extends Service {
  // 通过produceName获取信息
  async byNameGetProduceInfo({ produceName }) {
    const produce = await Model.EgProduce.findOne({
      where: {
        produceName,
      },
    }).catch(() => {});
    if (!produce) {
      return {
        code: 500,
        data: '没有此案例哦',
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
  async delEgProduce({ id }) {
    const produce = await Model.EgProduce.findByPk(id);
    if (!produce) {
      return {
        code: 500,
        data: '没有此案例哦',
      };
    }
    await produce.destroy();
    return {
      code: 200,
      data: '删除成功',
    };
  }
  async getEgProduceList({ kind, keyWord = '' }) {
    const produceList = await Model.EgProduce.findAll({
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
  async addEgProduce({ kind, produceName, video, readCount, imgUrl, videoTime, adminId }) {
    let produce = await Model.EgProduce.findOne({
      where: {
        produceName,
      },
    });
    if (produce) {
      return {
        code: 500,
        data: '案例重复，已存在同名案例',
      };
    }
    produce = await Model.EgProduce.create({
      kind, produceName, imgUrl, video, readCount, videoTime, adminId,
    });
    return {
      code: 200,
      data: '案例发布成功',
    };
  }
}

module.exports = EgProduceService;
