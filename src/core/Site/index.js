/* eslint-disable global-require */
import Logger from 'core/Logger';
import Publisher from 'core/Tracker/Publishers/Publisher';
import Trigger from './Triggers/Trigger';

const logger = new Logger('[Site]');
// logger.off();

export default class Site {
  #id;

  #triggers;

  constructor(siteConfig) {
    logger.debug('siteConfig:', siteConfig);
    if (window.tagtoo_advertiser_id !== siteConfig.id) {
      logger.error(window.tagtoo_advertiser_id, siteConfig.id);
      throw new Error('siteId wrong');
    }
    this.#id = siteConfig.id;
    this.#triggers = Array.from(siteConfig.triggers ?? []).filter((x) => x instanceof Trigger);
    logger.debug('triggers', this.#triggers);
    logger.debug('install trackers: start');
    Array.from(siteConfig.trackers ?? [])
      .reduce((acc, cur) => [...acc, ...cur.publishers.filter((x) => x instanceof Publisher)], [])
      .forEach((publisher) => {
        publisher.install?.();
      });
    logger.debug('install trackers: done');
  }

  listen() {
    logger.debug('🎧');
    this.#triggers.forEach((trigger) => {
      trigger.listen?.();
    });
  }
}
