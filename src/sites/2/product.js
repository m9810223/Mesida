import tracker from './tracker';

export default () => {
  tracker('pageView');
  const product = {
    sku: document.querySelector('.pid'),
    price: document.querySelector('.price'),
  };
  tracker('viewContent', product);
  document.querySelector('.addToCart').addEventListener('click', () => {
    tracker('addToCart', product);
  });
};
