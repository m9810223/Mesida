import Trigger from './Trigger';

export default class HistoryPush extends Trigger {
  #StateType;

  constructor(events) {
    super(events);
    this.triggerType = 'HistoryPush';
    this.logger.setup(`[${this.triggerType}]`);

    this.#StateType = 'push';

    this.eventType = `_${__NAME__}_${this.#StateType}`;
    this.historyName = `${this.#StateType}State`;
    if (window.history[this.eventType] /* flag */ === '1') {
      return;
    }
    window.history[this.eventType] = '1';
    const orig = window.history[this.historyName];
    window.history[this.historyName] = (...args) => {
      const result = orig.apply(window.history, args);
      window.dispatchEvent(new Event(this.eventType));
      return result;
    };
    // window.history[this.historyName] = (...args) => {
    //   const result = History.prototype[this.historyName].apply(window.history, args);
    //   window.dispatchEvent(new Event(this.eventType));
    //   return result;
    // };
  }

  listen() {
    this.logger.debug('🎧');
    window.addEventListener(this.eventType, () => {
      this.fire();
    });
  }
}
