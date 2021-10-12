// eslint-disable-next-line no-underscore-dangle
/* eslint-disable import/no-dynamic-require */

import Site from 'core/Site';

export default (siteConfig) => {
  const site = new Site(siteConfig);
  site.listen();
};
