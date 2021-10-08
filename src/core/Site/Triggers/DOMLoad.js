import Trigger from './Trigger';

export default class DOMLoad extends Trigger {
  constructor(events) {
    super(events);
    this.triggerType = 'DOMLoad';
    this.logger.setup(`[${this.triggerType}]`);
  }

  listen() {
    this.logger.debug('🎧');
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.fire();
      });
    } else {
      this.fire();
    }
  }
}
