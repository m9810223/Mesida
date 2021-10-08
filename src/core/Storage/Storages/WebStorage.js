import Logger from 'core/Logger';

const logger = new Logger();
logger.off();

export default class WebStorage {
  webStorageType = 'webStorage';

  get storage() {
    return window[this.webStorageType];
  }

  set(key, value) {
    logger.debug(`[${this.webStorageType}]`, 'set', key, value);
    return this.storage.setItem(key, value);
  }

  get(key) {
    logger.debug(`[${this.webStorageType}]`, 'get', key);
    return this.storage.getItem(key);
  }

  remove(key) {
    logger.debug(`[${this.webStorageType}]`, 'remove', key);
    return this.storage.removeItem(key);
  }

  clear() {
    logger.debug(`[${this.webStorageType}]`, 'clear');
    return this.storage.clear();
  }

  keys() {
    return Object.keys(this.storage);
  }

  values() {
    return Object.values(this.storage);
  }

  entries() {
    return Object.entries(this.storage);
  }
}
