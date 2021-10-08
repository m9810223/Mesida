import Publisher from './Publisher';

export default class DefaultPublisher extends Publisher {
  #installed;

  constructor({
    //
    a = 1,
  } = {}) {
    super();
    this.publisherName = 'DefaultPublisher';
    this.logger.setup(
      //
      `%c[${this.publisherName}]`,
      'background: #000000; color: #ffffff; font-weight: bold;'
    );
    this.eventNames = {
      //
    };
    this.#installed = false;

    this.a = a;
    // this.logger.debug('this.a:', this.a);
    this.check();
  }

  install() {
    if (this.#installed) {
      return;
    }
    this.logger.debug('install start');

    // do something to check and install Publisher

    this.#installed = true;
    this.logger.debug('install done');
  }

  // eslint-disable-next-line class-methods-use-this
  check() {
    // this.logger.debug('check');
  }
}
