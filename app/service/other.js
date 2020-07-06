'use strict';

const Service = require('egg').Service;
const Model = require('./../Mysql/model');

class OtherService extends Service {
  async saveOther({ kind, content, adminId }) {
    let other = await Model.Other.findOne({
      where: { kind },
    });
    if (!other) {
      other = await Model.Other.create({
        kind, content, adminId,
      });
    } else {
      other.content = content;
      await other.save();
    }
    return {
      code: 200,
      data: '保存成功',
    };
  }
  async getOther({ kind }) {
    const other = await Model.Other.findOne({
      where: { kind },
    });
    return {
      code: 200,
      data: '获取成功',
      result: {
        other: other || {
          kind,
          content: '',
        },
      },
    };
  }
}

module.exports = OtherService;
