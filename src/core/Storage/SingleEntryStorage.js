import Logger from 'core/Logger';
import { encode, decode } from './codec';
import Cookie from './Storages/Cookie';
import LocalStorage from './Storages/LocalStorage';
import SessionStorage from './Storages/SessionStorage';

const logger = new Logger('[SingleEntryStorage]');
logger.off();

// 原生的 storage 包成相同的 api
export default class SingleEntryStorage {
  #storages = { cookie: Cookie, sessionStorage: SessionStorage, localStorage: LocalStorage };

  #storageType;

  #storage;

  constructor(storageType = 'localStorage') {
    this.#storageType = storageType;
    this.#storage = new this.#storages[this.#storageType]();
  }

  get storageType() {
    return this.#storageType;
  }

  set(key, value, expire, domain, path) {
    logger.debug('set', key, value, expire, domain, path);
    return this.#storage.set(key, encode(value), expire, domain, path);
  }

  get(key) {
    logger.debug('get', key);
    return decode(this.#storage.get(key));
  }

  remove(key, domain, path) {
    logger.debug('remove', key, domain, path);
    return this.#storage.remove(key, domain, path);
  }

  clear() {
    logger.debug('clear');
    return this.#storage.clear();
  }

  keys() {
    return this.#storage.keys();
  }

  values() {
    return this.#storage.values().map((x) => decode(x));
  }

  entries() {
    return this.#storage.entries().map(([k, v]) => [k, decode(v)]);
  }

  migrate(key, toStorageType, expire, domain, path) {
    if (!(toStorageType in this.#storages)) {
      logger.error('wrong toStorageType:', toStorageType);
      return;
    }
    const value = this.get(key);
    this.clear();
    this.#storageType = toStorageType;
    this.#storage = new this.#storages[this.#storageType]();
    this.set(key, value, expire, domain, path);
  }

  backup(key, toStorageType, expire, domain, path) {
    if (!(toStorageType in this.#storages)) {
      logger.error('wrong toStorageType:', toStorageType);
      return;
    }
    const value = this.get(key);
    const backupStorage = new this.#storages[toStorageType]();
    backupStorage.set(key, value, expire, domain, path);
  }
}
