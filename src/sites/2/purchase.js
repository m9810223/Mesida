import storage from 'core/Storage';

import tracker from './tracker';

export default () => {
  const orderId = document.querySelector('.order').textContent;
  if (storage.orderIds.include(orderId)) {
    return;
  }
  const { cart } = storage;
  cart.orderId = orderId;
  tracker('purchase', cart);
};
