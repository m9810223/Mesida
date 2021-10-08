import Logger from 'core/Logger';

const logger = new Logger('[TriggerEvent]');
logger.off();

export default class TriggerEvent {
  #condition;

  #function;

  #delay;

  #maxExec; // 執行次數上限，無限：-1

  #execution = 0; // 已執行次數

  constructor({
    //
    cond = true,
    func = () => {},
    delay = 0,
    max = -1,
  }) {
    this.#condition = cond;
    this.#function = func;
    this.#delay = delay;
    this.#maxExec = max;
  }

  fire() {
    logger.debug('🔥');

    if (this.#maxExec > 0 && this.#execution >= this.#maxExec) {
      return;
    }
    if (!this.#condition()) {
      return;
    }
    const func = this.#function;
    setTimeout(async () => {
      // logger.debug('start');
      await func();
      // logger.debug('done');
    }, this.#delay);
    this.#execution += 1;
  }
}
