/* eslint valid-jsdoc: "off" */

'use strict';
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584509358804_9697';
  config.siteFile = {
    '/favicon.ico': fs.readFileSync('favicon.ico'),
  };
  // add your middleware config here
  config.middleware = [];
  config.static = {
    prefix: '/',
  };
  config.multipart = {
    fileSize: '200mb', // 默认大小为10Mb
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.nunjucks = {
    autoescape: false,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  return {
    ...config,
    ...userConfig,
  };
};
