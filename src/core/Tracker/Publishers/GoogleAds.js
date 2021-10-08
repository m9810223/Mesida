import Publisher from './Publisher';

export default class GoogleAds extends Publisher {
  publisherName = 'GoogleAds';

  constructor(config) {
    super(config);
    this.publisherName = 'GoogleAds';
    this.logger.setup(
      //
      `%c[${this.publisherName}]`,
      'background: #F4B400; color: #ffffff; font-weight: bold;'
    );
    this.eventNames = {};
    // this.init();
  }
}
