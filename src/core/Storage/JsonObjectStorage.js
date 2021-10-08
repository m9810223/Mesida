import Logger from 'core/Logger';
import SingleEntryStorage from './SingleEntryStorage';

const logger = new Logger('[JsonObjectStorage]');
logger.off();

// 將所有資料放在 `同一個 key'
export default class JsonObjectStorage {
  #namespace;

  #storageType;

  #storage;

  constructor(storageType = 'localStorage', namespace = `${__NAME__}_${String(__MODE__).slice(0, 3)}`) {
    this.#namespace = namespace;
    this.#storageType = storageType;
    this.#storage = new SingleEntryStorage(this.#storageType);
  }

  get namespace() {
    return this.#namespace;
  }

  get storageType() {
    return this.#storageType;
  }

  #get() {
    return JSON.parse(this.#storage.get(this.#namespace)) ?? {};
  }

  #set(object, expire, domain, path) {
    return this.#storage.set(this.#namespace, JSON.stringify(object), expire, domain, path);
  }

  set(key, value, expire, domain, path) {
    logger.debug('set', key, value, expire, domain, path);
    const object = this.#get();
    object[key] = value;
    return this.#set(object, expire, domain, path);
  }

  get(key) {
    logger.debug('get', key);
    const object = this.#get();
    return object[key];
  }

  remove(key, domain, path) {
    logger.debug('remove', key, domain, path);
    const object = this.#get();
    delete object[key];
    return this.#set(object, undefined, domain, path);
  }

  clear() {
    logger.debug('clear');
    return this.#set({});
  }

  keys() {
    logger.debug('keys');
    const object = this.#get();
    return Object.keys(object);
  }

  values() {
    logger.debug('values');
    const object = this.#get();
    return Object.values(object);
  }

  entries() {
    logger.debug('entries');
    const object = this.#get();
    return Object.entries(object);
  }

  migrate(toStorageType, expire, domain, path) {
    this.#storageType = toStorageType;
    this.#storage.migrate(this.#namespace, toStorageType, expire, domain, path);
  }

  backup(toStorageType, expire, domain, path) {
    this.#storage.backup(this.#namespace, toStorageType, expire, domain, path);
  }

  // #loads(str) {}

  // #dumps(object) {}
}
