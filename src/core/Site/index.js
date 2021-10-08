/* eslint-disable global-require */
import Logger from 'core/Logger';
import Publisher from 'core/Tracker/Publishers/Publisher';
import Trigger from './Triggers/Trigger';

const logger = new Logger('[Site]');
// logger.off();

export default class Site {
  #id;

  #triggers;

  #publishers;

  constructor(siteConfig) {
    logger.debug('siteConfig:', siteConfig);
    if (window.tagtoo_advertiser_id !== siteConfig.id) {
      logger.error(window.tagtoo_advertiser_id, siteConfig.id);
      throw new Error('siteId wrong');
    }
    this.#id = siteConfig.id;
    this.#triggers = Array.from(siteConfig.triggers ?? []).filter((x) => x instanceof Trigger);
    logger.debug('triggers', this.#triggers);
    this.#publishers = Array.from(siteConfig.trackers ?? []).reduce(
      (acc, cur) => [...acc, ...cur.publishers.filter((x) => x instanceof Publisher)],
      []
    );
    logger.debug('publishers', this.#publishers);
  }

  listen() {
    logger.debug('🎧');
    this.#publishers.forEach((publisher) => {
      publisher.install?.();
    });
    this.#triggers.forEach((trigger) => {
      trigger.listen?.();
    });
  }
}
