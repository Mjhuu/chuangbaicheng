'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

class UploadController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    // 获取文件流
    const stream = await ctx.getFileStream();
    // 基础的目录
    const uploadBasePath = 'app/public/upload';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(Math.random() * 1000)}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    mkdirsSync(path.join(uploadBasePath, dirname));
    // 生成写入路径
    const target = path.join(uploadBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      ctx.body = {
        err,
        code: 500,
      };
    }
    ctx.body = {
      url: path.join('/upload', dirname, filename),
      fields: stream.fields,
      code: 200,
    };
  }
}

module.exports = UploadController;
