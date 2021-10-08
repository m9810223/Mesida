/* eslint-disable class-methods-use-this */

import Logger from 'core/Logger';

const logger = new Logger('[Cookie]');
logger.off();

const topLevelDomain = (hostname = window.location.hostname) => {
  const levels = hostname.split('.');
  const expire = () => new Date(Date.now() + 1000).toUTCString();
  let domain;
  let cookie;
  const key = '__gtld__';
  for (let i = 0; i < levels.length; i += 1) {
    domain = hostname.replace(levels.slice(0, levels.length - i - 1).join('.'), '');
    cookie = `${key}=${domain}`;
    document.cookie = `${cookie}; expires=${expire()}; domain=${domain};`;
    if (document.cookie.indexOf(cookie) > -1) {
      break;
    }
  }
  document.cookie = `${cookie}; expires=${new Date(0).toUTCString()}; domain=${domain};`;
  return domain;
};

export default class Cookie {
  defaultExpire;

  #topLevelDomain;

  constructor(defaultExpire = 3600 /* second */) {
    this.defaultExpire = defaultExpire;
    this.#topLevelDomain = topLevelDomain();
  }

  get topLevelDomain() {
    return this.#topLevelDomain;
  }

  set(key, value, expire, domain, path) {
    logger.debug('set', key, value, expire, domain, path);
    if (!key) {
      return undefined;
    }
    const castedKey = encodeURIComponent(key);
    const castedValue = encodeURIComponent(value);
    const castedExpire = this.castExpire(expire ?? this.defaultExpire);
    const castedDomain = domain || this.#topLevelDomain;
    const castedPath = path || '/';
    // eslint-disable-next-line max-len
    const result = `${castedKey}=${castedValue}; expires=${castedExpire}; domain=${castedDomain}; path=${castedPath}; `;
    logger.debug('result:', result);
    document.cookie = result;
    return undefined;
  }

  get(key) {
    logger.debug('get', key);
    return (
      this.entries()
        .find((x) => x[0] === key)
        ?.pop() ?? null
    );
  }

  remove(key, domain, path) {
    logger.debug('remove', key, domain, path);
    this.set(key, '', new Date(0).toUTCString(), domain, path);
    return undefined;
  }

  clear() {
    logger.debug('clear');
    Array.from(this.keys()).forEach((key) => {
      this.remove(key);
    });
    return undefined;
  }

  castExpire(expire) {
    if (expire === Infinity) {
      return 'Fri, 31 Dec 9999 23:59:59 GMT';
    }
    if (expire?.constructor === Number) {
      return new Date(Date.now() + expire * 1000).toUTCString();
    }
    if (expire?.constructor === Date) {
      return expire.toUTCString();
    }
    if (expire?.constructor === String) {
      return expire;
    }
    return '';
  }

  get cookies() {
    return document.cookie
      .split(';')
      .filter(Boolean)
      .map((x) => x.trim());
  }

  keys() {
    return this.cookies.map((x) => decodeURIComponent(x.split('=')[0]));
  }

  values() {
    return this.cookies.map((x) => decodeURIComponent(x.split('=').slice(1).join('=')));
  }

  entries() {
    return this.cookies.map((x) => {
      const [k, ...v] = x.split('=');
      return [decodeURIComponent(k), decodeURIComponent(v.join('='))];
    });
  }
}
