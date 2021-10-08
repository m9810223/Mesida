import Trigger from './Trigger';

export default class HashChange extends Trigger {
  constructor(events) {
    super(events);
    this.triggerType = 'HashChange';
    this.logger.setup(`[${this.triggerType}]`);
  }

  listen() {
    this.logger.debug('🎧');
    window.addEventListener('hashchange', () => {
      this.fire();
    });
  }
}
