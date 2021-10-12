// example for separation

import HistoryPush from 'core/Site/Triggers/HistoryPush';
import PageView from 'core/Site/Triggers/PageView';

import tracker from './tracker';

import checkout from './checkout';
import product from './product';
import payment from './payment';
import purchase from './purchase';

const checkoutPage = window.location.pathname.includes('/cart');
// prettier-ignore
const step = () => Array.from(document.querySelectorAll('.step')).find((x) => x.style.display !== 'none').textContent;

export default {
  id: 2,
  trackers: [tracker],
  triggers: [
    new PageView([
      {
        cond: () => window.location.pathname.includes('/product'),
        func: product,
      },
    ]),
    new HistoryPush([
      {
        cond: () => checkoutPage && step() === '購物車',
        func: checkout,
      },
      {
        cond: () => checkoutPage && step() === '付款方式',
        func: payment,
      },
      {
        cond: () => window.location.pathname.includes('/order'),
        func: purchase,
      },
    ]),
  ],
};
