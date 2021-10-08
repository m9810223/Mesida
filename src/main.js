// eslint-disable-next-line no-underscore-dangle
/* eslint-disable import/no-dynamic-require */

import Site from 'core/Site';
// import Logger from 'core/Logger';

// const logger = new Logger('[main]');

if (__MODE__ !== 'production') {
  // eslint-disable-next-line global-require
  require('./devtool');
}

const siteModule = require(`sites/${__SITEID__}`).default;
const site = new Site(siteModule);
site.listen();
