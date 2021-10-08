import Publisher from './Publisher';

// https://developers.facebook.com/docs/facebook-pixel/reference

export default class FacebookBasecode extends Publisher {
  #installed;

  constructor(config) {
    super(config);
    this.publisherName = 'FacebookBasecode';
    this.logger.setup(
      //
      `%c[${this.publisherName}]`,
      'background: #3b5998; color: #ffffff; font-weight: bold;'
    );
    this.eventNames = {
      pageView /*        */: 'PageView',
      viewContent /*     */: 'ViewContent',
      addToCart /*       */: 'AddToCart',
      addToWishlist /*   */: 'AddToWishlist',

      trackCart /*       */: 'trackCart',

      checkout /*        */: 'InitiateCheckout',
      addPaymentInfo /*  */: 'AddPaymentInfo',
      purchase /*        */: 'Purchase',

      search /*          */: 'Search',
      register /*        */: 'CompleteRegistration',
      lead /*            */: 'Lead',

      // login /*           */: 'Login', // TODO

      // referrerSource /*  */: 'referrerSource', // TODO
    };
    this.#installed = false;
  }

  install() {
    if (this.#installed) {
      return;
    }
    this.logger.debug('install start');
    // TODO
    // eslint-disable-next-line no-constant-condition
    if (!false /* installed ... */) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
      `;
      document.body.appendChild(script);
    }
    this.ids.forEach((id) => {
      // const inited = [...document.querySelectorAll('script')]
      //   .map((x) => x.textContent)
      //   .map((x) => x.match(/fbq\('init', '(\d+)'\);/)?.pop())
      //   .filter((x) => x !== undefined);
      // if (inited.includes(id)) {
      //   return;
      // }
      this.installSingle(id);
    });
    this.#installed = true;
    this.logger.debug('install done');
  }

  installSingle(id) {
    this.trackSingle(id, 'init');
    this.trackSingle(id, 'PageView');
  }

  PageView(id) {
    this.trackSingle(id, 'PageView');
  }

  trackSingle(id, eventName, ...parameters) {
    if (this.blacklist.includes(eventName)) {
      this.logger.debug(eventName, id, 'is blocked !!');
      return;
    }
    this.logger.debug(id, eventName, ...parameters);
    window.fbq('trackSingle', id, eventName, ...parameters);
  }

  ViewContent(id, data) {
    const p = this.castProduct(data);
    const payload = {
      content_ids: p.content_ids,
      content_category: p.content_category,
      content_name: p.content_name,
      content_type: p.content_type,
      contents: p.contents,
      currency: p.currency,
      value: p.value,
    };
    this.trackSingle(id, 'ViewContent', payload);
  }

  AddToCart(id, data) {
    const p = this.castProduct(data);
    const payload = {
      content_ids: p.content_ids,
      content_name: p.content_name,
      content_type: p.content_type,
      contents: p.contents,
      currency: p.currency,
      value: p.value,
    };
    this.trackSingle(id, 'AddToCart', payload);
  }

  AddToWishlist(id, data) {
    const p = this.castProduct(data);
    const payload = {
      content_name: p.content_name,
      content_category: p.content_category,
      content_ids: p.content_ids,
      contents: p.contents,
      currency: p.currency,
      value: p.value,
    };
    this.trackSingle(id, 'AddToWishlist', payload);
  }

  trackCart(id, data) {
    const c = this.castCart(data);
    const payload = {
      content_ids: c.content_ids,
      content_name: c.content_name,
      content_type: c.content_type,
      contents: c.contents,
      currency: c.currency,
      value: c.value,
    };
    this.trackSingle(id, 'AddToCart', payload);
  }

  InitiateCheckout(id, data) {
    const c = this.castCart(data);
    const payload = {
      content_category: c.content_category,
      content_ids: c.content_ids,
      contents: c.contents,
      currency: c.currency,
      num_items: c.num_items,
      value: c.value,
    };
    this.trackSingle(id, 'InitiateCheckout', payload);
  }

  AddPaymentInfo(id, data) {
    const c = this.castCart(data);
    const payload = {
      content_category: c.content_category,
      content_ids: c.content_ids,
      contents: c.contents,
      currency: c.currency,
      value: c.value,
    };
    this.trackSingle(id, 'AddPaymentInfo', payload);
  }

  Purchase(id, data) {
    const c = this.castCart(data);
    const payload = {
      content_ids: c.content_ids,
      content_name: c.content_name,
      content_type: c.content_type,
      contents: c.contents,
      currency: c.currency,
      value: c.value,
    };
    this.trackSingle(id, 'Purchase', payload);
  }

  Search(id, keyword) {
    const payload = {
      // content_category: null,
      // content_ids: null,
      // contents: null,
      // currency: null,
      search_string: keyword,
      // value: null,
    };
    this.trackSingle(id, 'Search', payload);
  }

  CompleteRegistration(id, method, value = 0) {
    const payload = {
      content_name: method,
      currency: this.currency,
      status: 'completeRegister',
      value,
    };
    this.trackSingle(id, 'CompleteRegistration', payload);
  }

  Lead(id, leadName, leadCategory, value = 0) {
    // TODO??
    const payload = {
      content_category: leadCategory,
      content_name: leadName,
      currency: this.currency,
      value,
    };
    this.trackSingle(id, 'Lead', payload);
  }

  castProduct(data) {
    const p = Publisher.castProduct(data);
    return {
      content_type: 'product',
      content_ids: p.sku ? [p.sku] : ['emptySKU'],
      content_name: p.name ?? 'emptyName',
      content_category: p.categoryPath ?? '',
      contents: [{ id: p.sku ? [p.sku] : ['emptySKU'], quantity: 1 }],
      value: p.price,
      currency: p.currency ?? this.currency,
    };
  }

  castCart(data) {
    const c = Publisher.castCart(data);
    return {
      content_type: 'product_group',
      content_name: c.products.map((p) => p.name), // string ?
      content_ids: c.products.map((p) => p.sku),
      num_items: Array.from(c.products).length,
      contents: [{ id: c.sku ? [c.sku] : ['emptySKU'], quantity: 1 }],
      value: c.total,
      currency: c.currency ?? this.currency,
    };
  }
}
