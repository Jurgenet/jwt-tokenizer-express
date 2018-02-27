const mainConfig = require('../configs/main');

class ConfigService {
  static init() {
    if (!mainConfig) {
      throw new Error('main config not found!');
    } else {
      console.log('main config loaded');
    }
  }

  static getConfigParams() {
    return {
      port: process.env.PORT || mainConfig.port,
      database: mainConfig.database,
      secret: mainConfig.secret,
    };
  }
}

module.exports = ConfigService;
