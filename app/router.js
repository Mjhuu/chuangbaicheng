'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 售后服务
  router.get('/services', controller.home.services);
  // 技术支持
  router.get('/technology', controller.home.technology);
  // 关于我们
  router.get('/about', controller.home.about);
  // 产品分类页
  router.get('/kind/:kindName', controller.home.kind);
  // 产品详情页
  router.get('/produce/:produceName', controller.home.produce);
  // 案例分类页
  router.get('/eg/:egName', controller.home.eg);
  // 案例详情页
  router.get('/egProduce/:produceName', controller.home.egProduce);
  // 管理员登录
  router.post('/adminLogin', controller.admin.adminLogin);
  // 管理员密码修改
  router.post('/revisePwd', controller.admin.revisePwd);
  // 上传产品
  router.post('/addProduce', controller.produce.addProduce);
  // 保存产品信息
  router.post('/saveProduce', controller.produce.saveProduce);
  // 删除产品
  router.post('/delProduce', controller.produce.delProduce);
  // 获取产品列表
  router.get('/getProduceList', controller.produce.getProduceList);
  // 上传案例
  router.post('/addEgProduce', controller.egProduce.addEgProduce);
  // 删除案例
  router.post('/delEgProduce', controller.egProduce.delEgProduce);
  // 获取案例列表
  router.get('/getEgProduceList', controller.egProduce.getEgProduceList);
  // 上传文件
  router.post('/uploadFile', controller.upload.uploadFile);
  router.post('/saveOther', controller.other.saveOther);
  router.get('/getOther', controller.other.getOther);
  router.get('/adminBack', controller.home.adminManage);
};
