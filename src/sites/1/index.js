import { logger } from 'core';

import Tracker from 'core/Tracker';

// import DefaultPublisher from 'core/Tracker/Publishers/DefaultPublisher';
import FacebookBasecode from 'core/Tracker/Publishers/FacebookBasecode';
import GoogleAnalytics from 'core/Tracker/Publishers/GoogleAnalytics';
// import GoogleAds from 'core/Tracker/Publishers/GoogleAds';

import DOMLoad from 'core/Site/Triggers/DOMLoad';
import HashChange from 'core/Site/Triggers/HashChange';
import HistoryPush from 'core/Site/Triggers/HistoryPush';
import PageView from 'core/Site/Triggers/PageView';
import WindowLoad from 'core/Site/Triggers/WindowLoad';

// import Cart from 'core/Cart';
// import Product from 'core/Cart/Product';
// import Variant from 'core/Cart/Product/Variant';

// window.Cart = Cart;
// window.Product = Product;
// window.Variant = Variant;

const tracker = new Tracker({
  id: 1,
  // currency: 't',
  publishers: [
    // new DefaultPublisher({
    //   ids: ['11', '22'],
    //   a: 3,
    // }),
    // new GoogleAds({
    //   ids: ['ads1', 'ads2'],
    // }),
    new GoogleAnalytics({
      ids: ['ga1', 'ga2'],
    }),
    new FacebookBasecode({
      // currency: 'f',
      ids: [
        //
        '349034896886221',
        '558035352239207',
      ],
      blacklist: [
        //
        'AddToCart',
        'addToWishlist',
      ],
    }),
    // new FacebookBasecode({
    //   // currency: 'f',
    //   ids: ['349034896886221'],
    // }),
  ],
  conversions: [],
  // customEvents: [],
  // blacklist: ['ViewContent'],
});

logger.error('tracker', tracker);

const pageAll = () => true;

let i = 1;
const nothing = {
  cond: pageAll,
  func: () => {
    logger.error('nothing', i);
    i += 1;
  },
};

const trackExample = {
  cond: pageAll,
  func: () => {
    logger.error('trackExample', i);

    // tracker.track('pageView');
    // tracker.track('ViewContent', {});
    // tracker.track('login', 'ggg');
    // tracker.track('AddToCart', {});
    // tracker.track('AddToWishlist', {});
    // tracker.track('addToCart', {});
    // tracker.track('addToWishlist', {});
    // tracker.track('trackCart', {});
    // tracker.track('checkout', {});
    // tracker.track('addPaymentInfo', {});
    // tracker.track('purchase', {});
    // tracker.track('search', {});
    // tracker.track('register', {});
    // tracker.track('lead', {});
    // tracker.track('Purchase');
  },
};

const site = {
  id: 1,
  triggers: [
    //
    new DOMLoad([nothing]),
    new HashChange([nothing]),
    new HistoryPush([nothing]),
    new PageView([nothing]),
    new WindowLoad([trackExample]),
  ],
  trackers: [
    //
    tracker,
  ],
};

export default site;
