import Publisher from './Publisher';

// https://developers.google.com/analytics/devguides/collection/gtagjs
// https://support.google.com/google-ads/answer/7305793
// https://support.google.com/google-ads/answer/7548399

export default class GoogleAnalytics extends Publisher {
  #installed;

  constructor(config) {
    super(config);
    this.publisherName = 'GoogleAnalytics';
    this.logger.setup(
      //
      `%c[${this.publisherName}]`,
      'background: #F57E02; color: #ffffff; font-weight: bold;'
    );
    this.eventNames = {
      // pageView /*        */: 'PageView',
      // viewContent /*     */: 'ViewContent',
      // addToCart /*       */: 'AddToCart',
      // addToWishlist /*   */: 'AddToWishlist',

      // trackCart /*       */: 'trackCart',

      // checkout /*        */: 'InitiateCheckout',
      // addPaymentInfo /*  */: 'AddPaymentInfo',
      // purchase /*        */: 'Purchase',

      // search /*          */: 'Search',
      // register /*        */: 'CompleteRegistration',
      // lead /*            */: 'Lead',

      login /*           */: 'Login',
      signIn /*         */: 'sign_in',
      // signup_form_complete: 'signup_form_complete',
      pageView: 'page_view',
    };
    this.#installed = false;
  }

  install() {
    if (this.#installed) {
      return;
    }
    this.logger.debug('install start');
    this.ids.forEach((id) => {
      this.installSingle(id);
    });
    this.#installed = true;
    this.logger.debug('install done');
  }

  installSingle(id) {
    const installedIds = [...document.querySelectorAll('script[src*="/gtag/js?id="]')]
      .map((x) => x.src)
      .map((x) => x.match(/gtag\/js\?id=(\w+)/)?.pop());
    if (installedIds.includes(id)) {
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
    const scriptGtag = document.createElement('script');
    scriptGtag.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    `; // gtag('config','${id}', { 'groups': '${id}' });
    document.head.appendChild(scriptGtag);
    this.configSingle(id, { groups: id });
  }

  // eslint-disable-next-line class-methods-use-this
  trackSingle(id, eventName, parameters) {
    this.init();
    this.logger.debug(id, eventName, parameters);
    window.gtag('event', eventName, {
      ...parameters,
      groups: id,
    });
  }

  Login(id, method) {
    this.trackSingle(id, 'login', { method });
  }

  // eslint-disable-next-line camelcase
  sign_in(id) {
    this.trackSingle(id, 'sign_in');
  }

  // eslint-disable-next-line class-methods-use-this
  configSingle(id, ...parameters) {
    window.gtag('config', id, ...parameters);
  }

  // // eslint-disable-next-line class-methods-use-this
  // gtagSet(...parameters) {
  //   window.gtag('set', ...parameters);
  // }
}
