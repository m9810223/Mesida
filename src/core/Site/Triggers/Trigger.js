import Logger from 'core/Logger';
import TriggerEvent from './TriggerEvent';

export default class Trigger {
  constructor(events) {
    this.triggerType = 'BaseTrigger';
    this.logger = new Logger();
    this.events = Array.from(events).map((event) => new TriggerEvent(event));
  }

  listen() {
    this.logger.debug('🎧');
    this.fire();
  }

  fire() {
    this.logger.debug('🔥');
    Array.from(this.events).forEach((event) => {
      event.fire();
    });
  }
}
