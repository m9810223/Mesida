import Trigger from './Trigger';

export default class PageView extends Trigger {
  constructor(events) {
    super(events);
    this.triggerType = 'PageView';
    this.logger.setup(`[${this.triggerType}]`);
  }
}
