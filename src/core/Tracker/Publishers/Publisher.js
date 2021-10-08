/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import Logger from 'core/Logger';
import Product from 'core/Cart/Product';
import Cart from 'core/Cart';

export default class Publisher {
  #installed;

  constructor({
    //
    ids = [],
    currency = undefined,
    blacklist = [],
  } = {}) {
    this.publisherName = 'Publisher';
    this.logger = new Logger();
    this.eventNames = {};
    this.ids = ids;
    this.currency = currency;
    this.blacklist = blacklist;
    this.#installed = false;
  }

  track(eventName, ...data) {
    // track event for all ids
    const eventFunctionName = this.eventNames?.[eventName];
    if (!eventFunctionName) {
      this.logger.warn('No event:', eventName);
      return;
    }
    this.ids.forEach((id) => {
      this[eventFunctionName]?.(id, ...data);
    });
  }

  // will be called after site listened
  install() {
    if (this.#installed) {
      return;
    }
    this.logger.debug('install start');
    // install publishers code for all ids ...
    this.ids.forEach((id) => {
      // call: this.installSingle()
      this.installSingle(id);
    });
    this.#installed = true;
    this.logger.debug('install done');
  }

  // install publishers for one id
  installSingle(id) {
    // this.trackSingle(id, 'init');
  }

  // track event for one id
  trackSingle(id, eventName, ...parameters) {
    // window.XXX()
  }

  static castProduct(data) {
    if (data?.constructor !== Product) {
      return new Product(data);
    }
    return data;
  }

  static castCart(data) {
    if (data?.constructor !== Cart) {
      return new Cart(data);
    }
    return data;
  }
}
