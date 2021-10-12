import storage from 'core/Storage';

import tracker from './tracker';

export default () => {
  const cart = {
    products: [
      { sku: '00123', price: 10 },
      { sku: '00124', price: 10 },
    ],
  };
  tracker('trackCart', cart);
  tracker('checkout', cart);
  storage.cart = cart;
};
