const path = require('path');
const fs = require('fs');
module.exports = app => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  config.view = {
    cache: false
  };

  config.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      // 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件
      basedir: path.join(app.baseDir, 'app/view')
    }
  };

  config.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  config.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  config.keys = '123456';

  config.middleware = [
    'access'
  ];
  config.security = {
    csrf: {
      ignore: '/api/*/*',
    },
  };
  config.development = {
    ignoreDirs: [ 'app/web' ],
  };
  // database
  config.redis = {
    client: {
      host: process.env.EGG_REDIS_HOST || '127.0.0.1',
      port: process.env.EGG_REDIS_PORT || 6379,
      password: process.env.EGG_REDIS_PASSWORD || '',
      db: process.env.EGG_REDIS_DB || '0',
    },
  };
  config.default_page = 1;
  config.default_limit = 20;
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        // '.tpl': 'nunjucks',
        '.njk': 'nunjucks',
      },
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
