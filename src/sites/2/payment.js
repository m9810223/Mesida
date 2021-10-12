import storage from 'core/Storage';

import tracker from './tracker';

export default () => {
  const { cart } = storage;
  cart.payment = 'cash';
  tracker('addPaymentInfo', cart);
};
