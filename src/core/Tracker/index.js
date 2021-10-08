import Logger from 'core/Logger';

export default class Tracker {
  constructor({
    //
    currency = 'TWD',
    publishers = [],
    conversions = [],
    customEvents = [],
    blacklist = [],
  }) {
    this.logger = new Logger(
      //
      '%c[Tracker]',
      'color: #43bb88; font-weight: bold; text-decoration: underline;'
    );
    this.currency = currency;
    this.publishers = publishers.map((publisher) => {
      const result = publisher;
      result.currency ??= this.currency;
      return result;
    });
    // this.publishers.forEach((publisher) => {
    //   publisher.init();
    // });
    this.conversions = conversions;
    this.customEvents = customEvents;
    this.blacklist = blacklist;
  }

  track(eventName, ...data) {
    if (this.blacklist.includes(eventName)) {
      this.logger.debug(`block: ${eventName} !!`);
      return;
    }
    this.logger.debug(
      eventName,
      this.publishers.map((x) => x.publisherName)
    );
    this.publishers.forEach((publisher) => {
      publisher.track(eventName, ...data);
    });
  }
}
