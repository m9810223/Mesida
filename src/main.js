// eslint-disable-next-line no-underscore-dangle
/* eslint-disable import/no-dynamic-require */

import Site from 'core/Site';

if (__MODE__ !== 'production') {
  // eslint-disable-next-line global-require
  require('./devtool');
}

const siteModule = require(`sites/${__SITEID__}`);
const site = new Site(siteModule.default);

site.listen();
