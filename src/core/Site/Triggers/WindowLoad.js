import Trigger from './Trigger';

export default class WindowLoad extends Trigger {
  constructor(events) {
    super(events);
    this.triggerType = 'WindowLoad';
    this.logger.setup(`[${this.triggerType}]`);
  }

  listen() {
    this.logger.debug('🎧');
    if (window.performance?.timing.loadEventEnd > 0 || document.readyState === 'complete') {
      this.fire();
    } else {
      window.addEventListener('load', () => {
        this.fire();
      });
    }
  }
}
