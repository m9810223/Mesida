import start from 'core/start';
import Tracker from 'core/Tracker';

import FacebookBasecode from 'core/Tracker/Publishers/FacebookBasecode';
import GoogleAnalytics from 'core/Tracker/Publishers/GoogleAnalytics';

import HistoryPush from 'core/Site/Triggers/HistoryPush';
import PageView from 'core/Site/Triggers/PageView';
import WindowLoad from 'core/Site/Triggers/WindowLoad';

const trackerA = new Tracker({
  currency: 'USD',
  publishers: [
    new GoogleAnalytics({
      ids: ['ga1', 'ga2'],
    }),
    new FacebookBasecode({
      currency: 'TWD',
      ids: ['349034896886221', '558035352239207'],
      blacklist: ['trackCart', 'pageView'],
    }),
    new FacebookBasecode({
      currency: 'JPY',
      ids: ['349034896886221'],
    }),
  ],
});

start({
  id: 1,
  trackers: [trackerA],
  triggers: [
    new PageView([
      {
        cond: () => window.location.pathname.includes('/product'),
        func: () => {
          trackerA('pageView');
        },
      },
      {
        cond: () => window.location.pathname.includes('/product'),
        func: () => {
          trackerA('viewContent', { sku: '00123', price: 10 });
        },
      },
    ]),
    new HistoryPush([
      {
        cond: () => window.location.pathname.includes('/cart'),
        func: () => {
          trackerA('trackCart', {
            products: [
              { sku: '00123', price: 10 },
              { sku: '00124', price: 10 },
            ],
          });
        },
      },
    ]),
    new WindowLoad([
      {
        cond: () => window.location.pathname.includes('/order'),
        func: () => {
          trackerA('purchase', {
            products: [
              { sku: '00123', price: 10 },
              { sku: '00124', price: 10 },
            ],
            payment: 'cash',
            orderId: '202110111213',
          });
        },
      },
    ]),
  ],
});
