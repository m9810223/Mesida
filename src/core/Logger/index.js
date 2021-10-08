/*
const logger = new Logger('!!!');
logger.log(123);
logger.error(123);
 */
export default class Logger {
  #switch;

  constructor(...prefixes) {
    this.#switch = __MODE__ !== 'production';
    this.mark = '***';
    this.setup(...prefixes);
  }

  setup(...prefixes) {
    let forConsole;
    let forLog;
    if (prefixes[0]?.includes('%c')) {
      forConsole = [`${this.mark} ${prefixes[0]}`, ...prefixes.slice(1)];
      forLog = [prefixes[0].replace('%c', ''), ...prefixes.slice(2)];
    } else {
      forConsole = [this.mark, ...prefixes];
      forLog = prefixes;
    }
    Object.keys(console).forEach((key) => {
      this[key] = (...args) => {
        // eslint-disable-next-line no-underscore-dangle
        window[__WINVAR__]?.logs?.push([...forLog, ...args]);
        if (['debug', 'log'].includes(key) && !this.#switch) {
          return;
        }
        // eslint-disable-next-line no-console
        console[key](...forConsole, ...args);
      };
    });
  }

  on() {
    this.#switch = true;
  }

  off() {
    this.#switch = false;
  }
}
