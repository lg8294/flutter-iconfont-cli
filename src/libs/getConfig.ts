import path from 'path';
import fs from 'fs';
import colors from 'colors';
import defaultConfig from './iconfont.json';

export interface Config {
  symbol_url: string;
  trim_icon_prefix: string;
  default_icon_size: number;
  dart_class_prefix: string;
}

export const default_save_dir = './lib/generated/iconfont';

let cacheConfig: Array<Config>;

export const getConfig = () => {
  if (cacheConfig) {
    return cacheConfig;
  }

  const targetFile = path.resolve('iconfont.json');

  if (!fs.existsSync(targetFile)) {
    console.warn(colors.red('File "iconfont.json" doesn\'t exist, did you forget to generate it?'));
    process.exit(1);
  }

  let configs = require(targetFile);

  if(configs instanceof Array) {
    console.log('是数组', configs);
  } else {
    console.log('是单个数据',configs);
    configs = [configs];
  }

  configs.forEach(function (config) {
    if (!config.symbol_url || !/^(https?:)?\/\//.test(config.symbol_url)) {
      console.warn(colors.red('You are required to provide symbol_url'));
      process.exit(1);
    }

    if (config.symbol_url.indexOf('//') === 0) {
      config.symbol_url = 'http:' + config.symbol_url;
    }

    config.default_icon_size = config.default_icon_size || defaultConfig.default_icon_size;
    config.dart_class_prefix = config.dart_class_prefix || defaultConfig.dart_class_prefix;
  });

  cacheConfig = configs;

  return configs;
};
