import Tracker from 'core/Tracker';

import DefaultPublisher from 'core/Tracker/Publishers/DefaultPublisher';
import FacebookBasecode from 'core/Tracker/Publishers/FacebookBasecode';
import GoogleAnalytics from 'core/Tracker/Publishers/GoogleAnalytics';
import GoogleAds from 'core/Tracker/Publishers/GoogleAds';

export default new Tracker({
  currency: 'USD',
  publishers: [
    new DefaultPublisher({
      ids: ['11', '22'],
      a: 3,
    }),
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
    new GoogleAds({
      currency: 'JPY',
      ids: ['adsid1'],
    }),
  ],
  // conversions: [],
  // customEvents: [],
  // blacklist: ['ViewContent'],
});
