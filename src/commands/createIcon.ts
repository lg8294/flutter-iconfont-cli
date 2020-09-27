#!/usr/bin/env node

import colors from 'colors';
import { getConfig, default_save_dir } from '../libs/getConfig';
import { fetchXml } from 'iconfont-parser';
import { generateComponent } from '../libs/generateComponent';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import glob from 'glob';

const configs = getConfig();

const saveDir = path.resolve(default_save_dir);
mkdirp.sync(saveDir);
glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

configs.forEach(function (config) {
  fetchXml(config.symbol_url).then((result) => {
    generateComponent(result, config);
  }).catch((e) => {
    console.error(colors.red(e.message || 'Unknown Error'));
    process.exit(1);
  });
})